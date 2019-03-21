export default {
    methods : {
        ...mapMutations(['increment']),
        handleIncrement(){
            this.increment({amount : this.num})
        }
    }
}