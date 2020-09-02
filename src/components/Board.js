import React from 'react';
import Square from './Square';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            // 默认设置X为先手棋
            xIsNext:true,
            //撤销
            arrayNum:[],
            //历史记录
            record:[],
            num:1,
            showFlag:'none'
        }
    }

    handleClick(i) {
        const s = this.state.squares.slice();
        //如果一方赢了或者点击的棋格已经被填充了就直接返回,不进行更新或接下来的操作了
        if(this.calculateWinner(s)||s[i]){
            return;
        }
        s[i] = this.state.xIsNext?'A':'B'
        const array=this.state.arrayNum.slice();
        array.push(i)
        const arrayRecord=this.state.record.slice();
        let recordNum=this.state.num;
        arrayRecord.push("第"+(recordNum)+"步为"+s[i]+";所在格子为"+(i+1));
        recordNum=(recordNum+1);
        this.setState({
            squares: s,
            xIsNext:!this.state.xIsNext,
            arrayNum:array,
            record:arrayRecord,
            num:recordNum,
            showFlag:true
        }, () => {
            // 利用回调函数输出更新之后的数组的值,便于查看数值的变化
            // console.log(this.state.arrayNum)
            // console.log(this.state.squares)
            // console.log(this.state.record)
        })

    }
    // 撤销
    handleLastClick(){
        const s = this.state.squares.slice();
        if(this.state.arrayNum.length>0){
            if(s[this.state.arrayNum[this.state.arrayNum.length-1]]==='A'){
                this.setState({
                    xIsNext:true
                })
            }else{
                this.setState({
                    xIsNext:false
                })
            }
            const arrayRecord=this.state.record.slice();
            let recordNum=this.state.num;
            arrayRecord.push("第"+(recordNum)+"步为"+s[this.state.arrayNum[this.state.arrayNum.length-1]]+";撤销所在格子为"+(this.state.arrayNum[this.state.arrayNum.length-1]+1));
            recordNum=(recordNum+1);
            //将squares数组对应的下标元素置为null
            s[this.state.arrayNum[this.state.arrayNum.length-1]]=null;
            const ar = this.state.arrayNum.slice();
            //删除arrayNum数组的最后一个元素
            ar.splice(ar.length-1,1);
            this.setState({
                squares:s,
                arrayNum:ar,
                num:recordNum,
                record:arrayRecord
            },()=>{
                // console.log(this.state.squares)
                // console.log(this.state.arrayNum)
            })
        }
    }
    //重置
    handleOverClick(){
        const s = this.state.squares.slice();
        this.state.arrayNum.map((num)=>{
                s[num]=null
        })
        //重置的时候清除历史步骤记录
        const re=this.state.record.slice();
        re.map((value,index)=>{
            re[index]=null
        })
        this.setState({
            squares:s,
            record:re,
            showFlag:'none',
            num:1,
            xIsNext:true
        },()=>{
            // console.log(this.state.squares)
            // console.log(this.state.record)
        })
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClickSquare={() => this.handleClick(i)} />
    }
    //判断出胜者的函数
    calculateWinner(squares) {
        const lines = [
          //符合以下条件的数据则视为赢得情况
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }
    render() {
        const winner=this.calculateWinner(this.state.squares);
        let status;
        if(winner){
            status=winner
        }else{
            status=this.state.xIsNext?'A':'B'
        }
        return (
            <div className="content">
                <div className="status">{winner?'winner is ':'Next play is '}<span className='flag'>{status}</span></div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="btnGroup">
                    <button className="btn" onClick={()=>this.handleLastClick()}>撤销</button>
                    <button className="btn" onClick={()=>this.handleOverClick()}>重置</button>
                </div>
                <div className='record'>
                    <p>步骤记录</p>
                    <hr/>
                    <ul style={{display:this.state.showFlag}}>
                        {this.state.record.map(function(value,index){
                            if(null!=value){
                                return <li key={index}>{value}</li>
                            }
                        })}
                       {/* {this.state.record.map((value,index)=><li key={index}>{value}</li>)} */}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Board;