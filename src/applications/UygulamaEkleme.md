# Nasil Uygulama Eklerim?

Geomatik Uygulamalar web sitesine uygulama eklemek oldukca basittir.

Bunu icin [appplications/applications.json](https://github.com/Geomates/geomatikuygulamalar/blob/master/src/applications/applications.json) dosyasini degistirmeniz ve uygulama ikonunuzu da applications/images altina PNG formatinda koyarak Pull Request ile bu degisikligi gondermeniz gerekiyor.

Yaptiginiz degisiklik istegi tarafimizdan onlaylandiktan sonra hemen yayina girecektir.

##  application.js dosyasina eklenecek JSON objesinin semasi

```json
{
        "Name": "Uygulama Adi",
        "Description": "Uygulama aciklamasi",
        "Url": "http://uygulamaadresi.com",
        "Icon": "ikon.png",
        "Type": "Web" Web|Mobile|Desktop
}
```
