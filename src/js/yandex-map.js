var contactsPage = document.querySelector('#contacts-map');
if (contactsPage) {

    var mapContacts;
    ymaps.ready(init);
    function init() {
        mapContacts = new ymaps.Map('contacts-map', {
            center: [59.939095, 30.315868],
            zoom: 9,
            controls: ['zoomControl'] // Отключаем все элементы управления
        });

        var objectsMapContacts = new ymaps.ObjectManager();

        objectsMapContacts.objects.options.set('preset', 'islands#greenDotIconWithCaption');
        objectsMapContacts.objects.options.set('iconColor', 'red');

        mapContacts.geoObjects.add(objectsMapContacts);
        objectsMapContacts.add(listObjectsMapContacts);

        mapContacts.behaviors.disable('scrollZoom'); //запрет прокрутки по скроллу        
    }

    var listObjectsMapContacts = {
        "type": "FeatureCollection",
        "features": [
            { "type": "Feature", "id": 0, "geometry": { "type": "Point", "coordinates": [59.810460, 30.317979] }, "properties": { iconCaption: 'Пулково-Авто' } },
            { "type": "Feature", "id": 1, "geometry": { "type": "Point", "coordinates": [59.997145, 30.248962] }, "properties": { iconCaption: 'Неон-Авто' } },
            { "type": "Feature", "id": 2, "geometry": { "type": "Point", "coordinates": [59.808242, 30.165203] }, "properties": { iconCaption: 'Таллинский-Авто' } }
        ]
    };


}

