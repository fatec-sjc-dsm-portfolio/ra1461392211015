#include <WiFi.h>
#include "time.h"
#include <ArduinoJson.h>
#include <HTTPClient.h>
//#include "vento.h"
//#include "pluvPress.h"
//#include "tempUmi.h"

TaskHandle_t taskColeta;
TaskHandle_t taskMonWiFi;

SemaphoreHandle_t mutex;

typedef struct {
  float temp;
  float umi;
  float dirvento;
  float velvento;
  float pressao;
  float pluv;
  float bat;
} Medidas_t;

Medidas_t med;
DynamicJsonDocument post(1024);
String mac_adress;

String serverName = "http://192.168.203.6:5000/v0/dados";

//Configs do wifi
char *ssid = "LUCAS FR";
char *pwd = "fateclegal";

//configs do servidor NTP
char *ntpServer = "br.pool.ntp.org";
long gmtOffset = -3;
int daylight = 0;
time_t now;
struct tm timeinfo;

void ranStart() {
  med.temp = random(100,400) / 10.0;
  med.umi = random (20, 99);
  med.dirvento = random(0,359);
  med.velvento = random(100,1000) / 10.0;
  med.pressao = random(100000,101325) / 10.0;
  med.pluv = 0.0;
  med.bat = 100.0;
}

void tColeta(void *pvParameters)
{
  Serial.println("Task de Coleta de Dados");
  while(true){
    //regiao cr�tica
    xSemaphoreTake(mutex, portMAX_DELAY);
    med.temp = med.temp + random(-20, 25) / 10.0;
    if (med.temp > 40.0) {med.temp = 40.0;};
    med.umi = med.umi + random(-10, 10) / 10.0; 
    if (med.umi > 99.0) {med.umi = 99.0;};
    med.dirvento = med.dirvento + random(-200, 200) / 10.0; 
    if (med.dirvento > 359.0) { med.dirvento = med.dirvento - 359.0;};
    if (med.dirvento < 0.0) { med.dirvento = 359.0 - med.dirvento;};
    med.velvento = med.velvento + random(-150, 150) / 10.0; 
    if (med.velvento < 10.0) {med.velvento = 10.0;};
    med.pressao = med.pressao + random(-1000, 1000) / 10.0;
    med.pluv = med.pluv + random(0, 10) / 10.0;
    med.bat = med.bat - 0.01;
    xSemaphoreGive(mutex);
    //delay(3600000);
    delay(100);
  }
}

void connectWiFi()
{
  Serial.print("Conectando o WiFI ");
  while(WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado com sucesso, com o IP ");
  Serial.println(WiFi.localIP());
}

void tTemInternet(void *pvParameters)
{
  Serial.println("Task Monitor de Internet");
  while(true){
    if (WiFi.status() != WL_CONNECTED)
      connectWiFi();
    delay(30000);
  }
}

void setup() {
  Serial.begin(115200);
  mac_adress = WiFi.macAddress();
  mac_adress.replace(":", "");

  mutex = xSemaphoreCreateMutex();
  if (mutex == NULL)
    Serial.println("Erro ao criar o mutex");

  ranStart();
  
  Serial.println("Criando a task de Coleta");
  xTaskCreatePinnedToCore(
    tColeta, //funcao da task
    "TaskColeta", //nome da task
    1000, //tamanho da task
    NULL, //parametros task
    1, //prioridade da task
    &taskColeta, //task handle
    0 //core (loop = 1)
    );

  WiFi.begin(ssid, pwd);

  Serial.println("Criando a task 2");
  xTaskCreatePinnedToCore(
    tTemInternet, //funcao da task
    "MonitoraWiFi", //nome da task
    1000, //tamanho da task
    NULL, //parametros task
    1, //prioridade da task
    &taskMonWiFi, //task handle
    1 //core (loop = 1)
    );
}

void sincronizaTempo(void)
{
  //Configurando o tempo
  configTime(gmtOffset, daylight, ntpServer);
  if (!getLocalTime(&timeinfo))
  {
    Serial.println("Erro ao acessar o servidor NTP"); 
  }
  else
  {
    Serial.print("Configurado Data/Hora ");
    Serial.println(time(&now));
  }
}

void loop() {
  //if ((time(&now) % 3600) == 0) if para rodar a cada uma hora
  if ((time(&now) % 120) == 0) // if para rodar a cada 2 minutos
  {
    Serial.println("-->> Time to Trans");
    sincronizaTempo();
    xSemaphoreTake(mutex, portMAX_DELAY);
    post["id"] = mac_adress;
    post["time"] = time(&now);
    post["temp"] = med.temp;
    post["umi"] = med.umi;
    post["dir"] = med.dirvento;
    post["vel"] = med.velvento;
    post["prs"] = med.pressao;
    post["plu"] = med.pluv;
    post["bat"] = med.bat;
    xSemaphoreGive(mutex);

    //VAMOS TRANSMITIR EM HTTP POST
    WiFiClient wclient;
    HTTPClient http_post;

    http_post.begin(wclient, serverName);
    http_post.addHeader("Content-Type","application/json");
    http_post.addHeader("x-api-key","soijd7ehdhwdh7a3ihaih");
  
    String tmp;
    serializeJson(post, tmp);
    int http_get_code = http_post.POST(tmp.c_str());

    Serial.print("\n\r HTTP CODE=");
    Serial.println(http_get_code);
    if (http_get_code > 0)
    {
      Serial.println(http_post.getString());
    }
    else
    {
      Serial.println("Erro ao executar o GET");
    }
  }
  delay(1000);
}
