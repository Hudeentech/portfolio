export default {
    name: 'expWallpaper',
    title: 'experience Wallpaper',
    type: 'document',
    fields:[
        {
          name: 'heading',
          title: 'heading',
          type: 'string',
        },
        {
          name: 'contrast1',
          title: 'first heading contrast',
          type: 'string',
        },
        {
          name: 'contrast2',
          title: 'second heading contrast',
          type: 'string',
        },
        {
          name: 'contrast3',
          title: 'third heading contrast',
          type: 'string',
        },
        {
          name: 'wallpaper',
          title: 'wallpaper',
          type: 'image',
          Option:{
            hotspot:true,
          },
        },

    ]
  }
  