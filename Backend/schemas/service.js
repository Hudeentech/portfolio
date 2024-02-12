export default {
    name: 'service',
    title: 'Services',
    type: 'document',
    fields:[
        {
          name: 'heading',
          title: 'Heading intro title',
          type: 'string',
        },
        {
          name: 'summary',
          title: 'Breif summary',
          type: 'string',
        },
        {
          name: 'icon',
          title: 'An image of you',
          type: 'image',
          options:{
          hotspot:true,
        }
        },
    ]
  }
  