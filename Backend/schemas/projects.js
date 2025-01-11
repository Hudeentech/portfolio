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
          type: 'array',
          of: [
            {type: 'block',
              styles: [ 
                {title: 'Normal', value: 'normal'},
                {title: 'Heading 1', value: 'h1'},
                {title: 'Heading 2', value: 'h2'},
                {title: 'Heading 3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'},
                {title: 'Code', value: 'code'}
              ],
            }
        
          ],
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
  