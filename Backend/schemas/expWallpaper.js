export default {
  name: 'expWallpaper',
  title: 'Experience Wallpaper',
  type: 'document',
  fields: [
    {
      name: 'wallpaper',
      title: 'Wallpaper',
      type: 'image',
      options: {
        hotspot: true, // Allow cropping
      },
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'contrast1',
      title: 'Contrast 1',
      type: 'string',
    },
    {
      name: 'contrast2',
      title: 'Contrast 2',
      type: 'string',
    },
    {
      name: 'contrast3',
      title: 'Contrast 3',
      type: 'string',
    },
  ],
};
