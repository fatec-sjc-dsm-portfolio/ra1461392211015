from ultralytics import YOLO



def script_pragas():
    print('entrando na analise de pragas')
    model = YOLO('IA/weights/best.pt') 
    results = model(['IA/imgs/imagem.jpg']) 
    print('caminhos salvos e model chamado')
    
    for result in results:
        boxes = result.boxes 
        total_boxes = len(boxes)
        total_pragas = str(total_boxes)
        print('total pragas'+ total_pragas)

    return total_pragas

