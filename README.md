# Jaquet Droz Watches
Store selling JaquetDroz Watches. The project is non-commercial, made only for preview purposes. It is not officially associated with Jaquet Droz brand.

Made and inspired by design on dribble:
https://dribbble.com/shots/15975750-Watch-Shop-App

## Table of contents
* [General info](#general-info)
* [Technologies](#Technologies)
* [Videos_Images](#Videos_Images)
* [Further improvments](#Further-improvments)

## General info
Currently my Magnum Opus in terms of design and animation.

Navigation is done by state changes in App.js, passed down as props to screens. Each change of screen is associated with fadeing out of current components.

The main screen of the App, the BrowseScreen allows to swipe between watch collections and pick specific models of the watches. There is module allowing to switch between rotation mode and zoom mode. Rotation mode allows to rotate the watch. Zoom mode allows to zoom in on the selected watch while panning over the picture. 

After browsing the user can add a specific watch to shopping bag and proceed to checkout.

## Technologies
* Redux toolkit
* React Native Reanimated
* Hooks: useEffect, useState, useRef, useCallback

## Videos_Images
https://user-images.githubusercontent.com/64642323/169338563-ccdb2a40-d905-42b1-8c50-a88575cff224.mp4

## Further improvments
* Payments are mock-only for a moment. In future actual ordering/payments may be implemented.
* Additional watches may be added.
