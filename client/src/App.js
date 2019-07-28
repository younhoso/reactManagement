import React, {Component}from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
})

class App extends Component {
  state = {
    customers: ""
  }

  componentDidMount() { //api 서버에 접근해서 데이터를 받아오는 작업은 componentDidMount에서 할수 있다.
    this.callApi()  //callApi 밑에서 작성한 비동시 함수 실행  
    .then((res) => this.setState({customers:res}))  //then 성공했을때 웨에 customers에 값들을 저장하겠다.
    .catch(err => console.log(err));    //catch 실패 했을때 에러 메세지
  }

  callApi = async () => { //비동기로 데이터에 접근해서 가져온다.
    const response = await fetch('/api/customers');
    const body = await response.json(); //json형식으로 가져온다.
    return body;
  }
  
  render(){
    const {classes} = this.props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>test</TableCell>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>나이</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.customers ? this.state.customers.map((c) => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>);
            }) : ""}
            </TableBody>
          </Table>
        </Paper>
    );
  }
}

export default withStyles(styles)(App);
