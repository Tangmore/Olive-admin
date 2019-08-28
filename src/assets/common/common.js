// const common = {
//     //自适应高度,value是this
//     adaptiveHeight(value) { 
//       const that = value;
//       // 判断是否有表单查询区域
//       if(that.$refs.formheight){
//         var formheight= that.$refs.formheight.$el.clientHeight;
//         console.log(console.log(formheight));
//       }else{
//         var formheight=0;     
//       } 
//       window.onresize = () => {
//         if(!that.$refs.mainheight){return;}
//         return (() => {
//           let tableHeight = that.$refs.mainheight.$el.clientHeight - formheight - 50;
//           that.tables.height = tableHeight + 'px';
//         })()
//       };
//       let tableHeight = that.$refs.mainheight.$el.clientHeight - formheight - 50;
//       that.tables.height = tableHeight + 'px';
//     }  
//   }
  
//   export { common }
  