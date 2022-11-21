const db = require('../app/models/index');

const create = async () => {
  return await db.tutorials.bulkCreate([
    {
        title: 'TEST#1',
        description: 'Test percobaan pertama',
        published: 1,
        createdAt: new Date(),
        updatedAt: new Date()
        },
    {
        title: 'TEST#2',
        description: 'test percobaan kedua',
        published: 0,
        createdAt: new Date(),
        updatedAt: new Date()
        },
  ], 
  {
		ignoreDuplicates: true,
  }).then(result=>{
    if(result) console.log(`${new Date()} Seeder #1 Successfuly...`)
  })
}

module.exports = { create }