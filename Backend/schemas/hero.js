export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'headingSalutation',
      title: 'Heading Salutation',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Heading Name',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Brief Summary',
      type: 'string',
    },
    {
      name: 'fade',
      title: 'Animated Text',
      type: 'string',
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'WhatsApp', value: 'whatsApp' },
                  { title: 'Telegram', value: 'telegram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
  ],
};
