export const getHour = ()=>{
    let currentHour = new Date().getHours();
    let message = '';
    if (currentHour < 10) {
        message = "早上好"
    }
    if (currentHour >= 10 && currentHour <= 14) {
        message = "中午好"
    }
    if (currentHour > 14 && currentHour <= 18) {
        message = "下午好"
    }
    if (currentHour > 18 && currentHour <= 24) {
        message = "晚上好"
    }
    return message;
}