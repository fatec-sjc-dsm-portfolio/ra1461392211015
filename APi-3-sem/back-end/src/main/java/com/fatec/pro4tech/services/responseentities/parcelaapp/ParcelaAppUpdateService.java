package com.fatec.pro4tech.services.responseentities.parcelaapp;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

import com.fatec.pro4tech.models.ParcelaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fatec.pro4tech.entities.Parcela;
import com.fatec.pro4tech.repository.RepositorioParcela;

@Service

public class ParcelaAppUpdateService {

    @Autowired
    private RepositorioParcela repository;

    public ResponseEntity<Parcela> update(ParcelaModel updateParcela, Long id_parcela) {
        try {
            Optional<Parcela> currentUser = repository.findById(id_parcela);
            Parcela target = currentUser.orElse(null);

            if (target == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            target.setStatus(true);
            if (updateParcela.valor_pago() != null) {
                target.setValor_pago(updateParcela.valor_pago());
            }
            LocalDateTime dataPagamento = LocalDateTime.now();
            LocalDateTime dataCredito = dataPagamento.plusDays(2);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            Instant instantPagamento = dataPagamento.atZone(ZoneId.systemDefault()).toInstant();
            Instant instantCredito = dataCredito.atZone(ZoneId.systemDefault()).toInstant();
            Date datePagamento = Date.from(instantPagamento);
            Date dateCredito = Date.from(instantCredito);

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            String dataPagamentoFormatada = dateFormat.format(datePagamento);
            String dataCreditoFormatada = dateFormat.format(dateCredito);

            target.setData_pagamento(datePagamento);
            target.setData_credito(dateCredito);
            System.out.println(dataPagamentoFormatada);
            System.out.println(dataCreditoFormatada);

            repository.save(target);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (InvalidDataAccessApiUsageException e) {
            MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
            header.add(e.getCause().getMessage(), e.getLocalizedMessage());
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }
}
