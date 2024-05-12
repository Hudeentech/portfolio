export default {
    name: 'experienceIcons',
    title: 'Experience icons',
    type: 'document',
    fields:[
        {
          name: 'expIcons',
          title: 'Enter experience icon e.g React',
          type: 'array',      
            of: [{ type: 'image' }]
        },
    ]
  }
  