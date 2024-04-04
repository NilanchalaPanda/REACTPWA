
import supabase from "../supabase";
export default async function getUsers(){
let { data: Users, error } = await supabase
  .from('Users')
  .select('*')

  if(error){
    console.error(error)
    throw new Error("user could not be fetched")
  }
  data2= Users.json()
  return Users;
}