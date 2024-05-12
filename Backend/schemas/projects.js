export default {
    name: 'projects',
    title: 'Projects',
    type: 'document',
    fields:[
        {
          name: 'projectName',
          title: 'Project Name',
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
          title: 'project live Links',
          type: 'url',
        },
        {
          name: 'git',
          title: 'git repo Links',
          type: 'url',
        },
        {
          name: 'behance',
          title: 'behance Links',
          type: 'url',
        },
        {
          name: 'tag',
          title: 'Category',
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
  