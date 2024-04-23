

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields:[
      {
        name: 'title',
        title: 'heading title',
        type: 'string',
      },
      {
        name: 'contrast',
        title: 'heading contrast',
        type: 'string',
      },
      {
        name: 'summary',
        title: 'breif summary',
        type: 'string',
      },
      {
        name: 'imgUrl',
        title: 'An image of you',
        type: 'image',
        options:{
          hotspot:true,
        }
      },
  ]
}
