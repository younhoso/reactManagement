import React, {Component}from 'react';
import Customer from './components/Customer.js';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

/**
 * 1) constructor();  // class App 호출힐때 constructor함수를 먼저 자동으로 호출하는 시점
 * 
 * 2) componentwillMount();
 * 
 * 3) render(); //실제로 컴포넌트가 화면에 그려지는 시점
 * 
 * 4) componentDidMount();
 */

/**
 *  props or state 가 변경되는 경우에는 
 *  shouldComponentUpdate() 함수가 사용이 되어서 다시 
 *  render();함수를 불러와서 화면쪽을 갱신해준다.  
 */

class App extends Component {
  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() { //api 서버에 접근해서 데이터를 받아오는 작업은 componentDidMount에서 할수 있다.
    this.timer = setInterval(this.progress, 20); //0.02초 마다 progress 함수가 실행이 된다.
    this.callApi()  //callApi 밑에서 작성한 비동기 함수 실행  
    .then((res) => {
      this.setState({customers: res})
    })  //then 성공했을때 웨에 customers에 값들을 저장하겠다.
    .catch((err) => {
      console.log(err)
    });  //catch 실패 했을때 에러 메세지 
  }

  callApi = async () => { //비동기로 데이터에 접근해서 가져온다.
    const response = await fetch('/api/customers'); //api 주소 경로 작성
    const body = await response.json(); //json형식으로 가져온다.
    return body;
  }
  
  progress = () => {
    const {completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render(){
    const {classes} = this.props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호임니다</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>나이</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.customers ? this.state.customers.map((c) => { 
                return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>);
            }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                </TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
    );
  }
}

export default withStyles(styles)(App);
