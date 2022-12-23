import bcrypt from "bcryptjs"
export const users = [
    {
        name:"admin",
        email:"admin@exemple.com",
        password: bcrypt.hashSync("admin",10) ,
        isAdmin:true,
    },
    {
        name:"chb",
        email:"chb@exemple.com",
        password: bcrypt.hashSync("chb",10) ,
    }
  ];
  
  
  