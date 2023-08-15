export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    { 
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'price_per_grams',
      title: 'Price for Grams',
      type: 'object',
      fields: [
        {
          name: 'stock',
          title: 'Stock',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'grams',
                  title: 'Grams',
                  type: 'number',
                },
                {
                  name: 'price',
                  title: 'Price',
                  type: 'number',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'grind',
      title: 'Grind',
      type: 'array',
      of: [{ type: 'string'}]
    },
    {
      name: 'process',
      title: 'Process',
      type: 'array',
      of: [{ type: 'string'}]
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{ type: 'string'}]
    },
    {
      name: 'origins',
      title: 'Origins',
      type: 'array',
      of: [{ type: 'string'}]
    },
    {
      name: 'roastDepth',
      title: 'Roast Depth',
      type: 'string',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'string'}]
    }
  ]
}