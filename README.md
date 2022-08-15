#Games Store

In this app users can create accounts to purchase/gift games to other registered users (unregistered users can not purchase or gift games). Games can be purchased multiple times thus increasing the quantity of a specific game in the user's collection. Users have a wishlist to monitor specific games.
<br/>

##Pages:
- Home
- Catalogue
- Search
- Profile
- Cart

User authentication is done via modal therefore it will be present on any page when the user is not loged, and not present when the user is logged.
<br/><br/>

##Dependencies:

- Parse.SDK (backend)
<br/>
- Font awesome
- - fontawesome-svg-core
- - free-solid-svg-icons
- - react-fontawesome
<br/>
- Redux
- - react-redux
- - @reduxjs/toolkit
<br/><br/>

##Folder structure
```
root
└───public
│   │   
│   └───icons
│   └───local
│
└───src
│   └───assets
│   └───components
│   │   └───core
│   │   └───pages
│   │   └───shared
│   │   
│   └───hooks
│   └───routes
│   └───services
│   │   └───shared
│   │
│   └───store
│       └───reducers
```