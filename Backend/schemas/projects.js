export default {
    name: 'projects',
    title: 'Projects',
    type: 'document',
    fields:[
        {
          name: 'heading',
          title: 'Project Name',
          type: 'string',
        },
        {
          name: 'summary',
          title: 'Breif summary',
          type: 'string',
        },
        {
          name: 'desc',
          title: 'Project description',
          type: 'string',
        },
        {
          name: 'overview',
          title: 'Project overview',
          type: 'string',
        },
        {
          name: 'links',
          title: 'project Links',
          type: 'url',
        },
        {
          name: 'tag',
          title: 'Tag',
          type: 'string',
        },
        {
          name: 'images',
          title: 'project image',
          type: 'image',
          options:{
          hotspot:true,
        }
        },

    ]
  
  }
  