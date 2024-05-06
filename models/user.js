const mongoose = require('mongoose');
const Product = require('./product');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username is required.'],
        unique : [true, 'Username must be unique.'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        maxlength: [50, 'Username cannot exceed 50 characters.']
    },
    email :{
        type : String,
        required : [true, 'Email is required.'],
        unique : [true, 'Email must be unique.'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password :{
        type : String,
        required : [true, 'Password is required.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [128, 'Password cannot exceed 128 characters.']
    },
},{ timestamps: true });


userSchema.pre('deleteOne', async function(next) {
    try {
        
        await Product.deleteMany({ owner:this.getQuery()._id});
        next();
    } catch (error) {
        console.log(error)
        next(error);
    }
});

// userSchema.pre('deleteOne', asfync function(next) {
//     try {
//         const userId = this.getQuery()._id;
//         const products = await Product.find({ owner: userId });
//         // Find all products owned by the user
//         for (const product of products) {
//             await Like.deleteMany({ product: product._id });

//             await Comment.deleteMany({ product: product._id });
//         }
//         // Remove references to likes from other products
//         await Product.updateMany(
//             { likes: { $elemMatch: { user: userId } } },
//             { $pull: { likes: { user: userId } } }
//         );
//         // Remove references to comments from other products
//         await Product.updateMany(
//             { comments: { $elemMatch: { user: userId } } },
//             { $pull: { comments: { user: userId } } }
//         );
//         // Delete likes associated with the user
//         await Like.deleteMany({ user: userId });
//         // Delete comments associated with the user
//         await Comment.deleteMany({ user: userId });
//         next();
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });


const User =  mongoose.model('User',userSchema);

module.exports = User;