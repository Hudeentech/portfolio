

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields:[
      {
        name: 'Name',
        title: 'heading title',
        type: 'string',
      },
      {
        name: 'summary',
        title: 'breif summary',
        type: 'string',
      },
      {
        name: 'imageurl',
        title: 'An image of you',
        type: 'image',
        options:{
          hotspot:true,
        }
      },
  ]
}
