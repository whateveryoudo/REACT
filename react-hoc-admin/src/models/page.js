export default {
    initialState : {
        title : ''//{local, text, icon} 支持国际化
    },
    setTitle : (title) => {
        return {title}
    }
}