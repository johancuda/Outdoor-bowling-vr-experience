# A bowler's dream : anti-gravity bowling in the wilderness

Appreciate the pleasures of outdoor bowling in this short VR experience.

![Bowling gif](/images/extrait.gif)

This project was developed during the class "Réalité virtuelle et augmentée" taught by Isaac Pante (SLI, Lettres, Université de Lausanne).

## Description

This experience tries to recreate a pleasent bowling experience in the wilderness, without the bad music, the weird scents or the unnecessary competitiveness. Enjoy some smooth music, relax and just throw some balls at the pins !

### Features

In this experience you can:
- Choose a bowling ball in the rack by clicking on it (it will appear on the bowling lane)
- Throw the ball at the pins by interacting with it (implemented using the physics system to handle collisions)
- Listen to some music by interacting with the radio (if the music doesn't start click another time – see [Issues & improvements](#issues--improvements) for further informations)
- Unlock achievements by playing! (implemented using LocalStorage to keep track of the achievements you already unlocked)

## Installation

To test on your machine : download the folder, open it in [VS Code](https://code.visualstudio.com/) and run [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). You're done!

## Architecture

```
VR_Bowling
│   README.md
│   index.html
│   main.js 
│
└───assets
│   └───img
│   └───models
        └───unused_mtl
│   └───sfx
│
└───images
```

- `index.html` contains all the A-Frame script and assets management
- `main.js` contains the components developed to create interaction
- `assets` contains the images, models, materials and sounds used (with a few unused `.mtl` files that could be used)
- `images` contains files used in the `README.md` file 

## Development

This experience was developed using:

- [A-Frame](https://aframe.io/) for the main experience
- [aframe-environment-component](https://github.com/supermedium/aframe-environment-component) for the scenery
- [aframe-physics-system](https://github.com/c-frame/aframe-physics-system) for the collisions

This VR experience is based on [ZakAttakk's A-Frame Bowling Game](https://github.com/ZakAttakk/A-Frame-Bowling-Game) that we rewrote to update the scripts to modern A-Frame versions.

## Issues & improvements

Most modern web browsers try and block autoplaying music on a website so you have to either click two times on the radio or have any kind of interaction in the VR experience before being able to play music on the radio.

### Physics

A-Frame being mostly improved by open-source projects we ran into compatibility issues between A-Frame versions and certain libraries, such as [aframe-physics-system](https://github.com/c-frame/aframe-physics-system). One of the problem we couldn't solve was the pins getting back up after collision. 

### Bugs

You might notice bugs with the physics system or sounds, if that's the case just reload the page.

### TODO

A few features we would like to implement would be:

- Adding a button to get the pins back to their original positions. This is currently not possible due to an incompatibility between certain 3D models handlers and the physics system.
- Adding improved bowling movements, such as ball picking and placing



## Copyright

We used the following assets to make this experience :

### Models & textures

- Wood texture by [lumoize](https://sketchfab.com/3d-models/bowling-alley-floor-texture-0c9eef0c662e4d2a8d0ab7329c245891)
- Chair model by [ammantilla2156](https://www.turbosquid.com/3d-models/wood-fabric-asset-3d-model-1335126)
- Radio model and texture by [yurii3ddesigner](https://www.turbosquid.com/3d-models/vintage-soviet-radio-rodina-3d-model-1636852)
- Table model by [Javidan](https://www.turbosquid.com/3d-models/3d-coffee-table-with-iron-legs-model-2336174)
- Pin model and texture by [waelr](https://www.turbosquid.com/3d-models/free-bowling-pin-3d-model/1103878)
- Bowling ball rack by [AI L.](https://3dwarehouse.sketchup.com/model/da37ad62c9090dd2977b68653eb2e1e/Bowling-Ball-Rack)
- Bowling ball texture 1 on [Kenflin's github](https://github.com/Kenflin/bowling-aframe/blob/main/assets/bowlingball.png)
- Bowling ball green texture on [Freepik](https://www.freepik.com/free-photo/multi-colored-psychedelic-background_11761247.htm#fromView=keyword&page=1&position=4&uuid=27cedf6d-b760-4587-9236-764872882471&new_detail=true&query=Green+Marble+Texture)
- Bowling ball orange texture on [Freepik](https://www.freepik.com/free-photo/abstract-mix-waves-paint_6120257.htm#fromView=keyword&page=1&position=2&uuid=45365db8-6de5-478d-96a9-74cd152e588a&new_detail=true&query=Orange+Marble)
- Palette model and textures by [Lucif 3D](https://www.turbosquid.com/3d-models/3d-garden-table-1823963)
- Wine bottle model and textures by [shmelevartem](https://sketchfab.com/3d-models/bottle-of-wine-9e279fe2d307469f8b6f825728610e8f)
- Pizza model by [plaggy](https://www.turbosquid.com/3d-models/pizza-salami-2212024)

### Sound effects & music

- Strike sound by [SieuAmThanh](https://pixabay.com/sound-effects/bowling-strike-40456/)
- Ball roll sound by [carbilicon](https://pixabay.com/sound-effects/bowling-93882/)
- Jazz ambiance by [officeMIKADO](https://pixabay.com/music/traditional-jazz-cool-jazz-session-8-242828/) (AI generated)

## Aknowledgments

This project was created using ChatGPT for code review, code generation and debugging. We want to thank the JavaScript A-Frame community for its help and all the people that create free assets !