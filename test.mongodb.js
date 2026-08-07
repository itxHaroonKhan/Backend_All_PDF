use('test')


// 1. Embedding Example
// Student کے اندر Course کا پورا data رکھا گیا ہے

db.students.insertOne({
    _id:2,
    name:'Haroon',
    courses:[
        {
            _id:1,
            name:'BCA',
            price:150000,
            duration:3
        },
    ]
})


// Student کے courses میں search کرنا

db.students.find(
    { 'courses.name': 'BCA' }
)


// 2. Embedding Example
// Student کے اندر Address رکھا گیا ہے

db.students.insertOne({
    _id:3,
    name:'Haroon',
    address:{
        city:'Karachi',
        state:'Sindh',
        pincode:75100,
    }
})


// Address city update کرنا

db.students.updateOne(
    {'address.city':'Karachi'},
    {
        $set:{
            'address.city':'Lahore'
        }
    }
)


// تمام students دیکھنا

db.students.find()


// صرف address city دکھانا

db.students.find(
    {},
    {
        'address.city':1,
        _id:0
    }
)


// 3. Referencing Example
// Courses کا الگ collection بنانا

db.courses.insertOne({
    _id:2,
    name:'Graphic Design',
    price:150000,
    duration:1
})


// Courses دیکھنا

db.courses.find()


// Student میں صرف Course IDs save کرنا

db.students.insertOne({
    _id:5,
    name:'Haroon',
    courses:[1,2]
})


// Students دیکھنا

db.students.find()


// 4. $lookup Example
// Students اور Courses کو join کرنا

db.students.aggregate([
    {
        $lookup:{
            from:'courses',
            localField:'courses',
            foreignField:'_id',
            as:'coursesDetails'
        }
    }
])
