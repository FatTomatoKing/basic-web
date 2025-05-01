
export const SET_TOKEN = (token: string) =>{
    localStorage.setItem("TOKEN", loginResponse.data)
}
export const GET_TOKEN = () => {
    return localStorage.getItem("TOKEN")
}