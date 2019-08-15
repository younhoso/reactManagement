import React,{Component} from 'react'
import {post} from 'axios';

class CustomerAdd extends Component {
    constructor(props){    
        super(props);
        this.state = {
            file: null,
            userName: '',
            dirthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('dirthday', this.state.dirthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {    //파일이 포함되어 있는 데이터를 서버로 전달하고자 할때는 웹 표준에 맞는 해더를 추가해줘야 한다. 
            headers: {
                'content-type': 'multipart/form-data'   //내가지금 보내고자 하는 데이터는  multipart/form-data 라고 작성을 해줘야 한다.(전달하고자 하는 데이터에 파일이 포함되어 있을때 설정을 해줘야하는 요소이다.)
            }
        }
        return post(url, formData, config);
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer().then((response)=>{
            console.log(response.data);
        })
        this.setState({
            file: null,
            userName: '',
            dirthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
        window.location.reload();
    };

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value,
        })
    };

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState); //현재 State값을 갱신한다.
    };

     render(){
         return (
             <div>
                 <form onSubmit={this.handleFormSubmit}>
                    <h1>고객 추가</h1>
                    프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                    이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                    생년월일: <input type="text" name="dirthday" value={this.state.dirthday} onChange={this.handleValueChange} /><br/>
                    성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                    직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
                    <button type="submit">추가하기</button>
                 </form>
             </div>
         )
     }
}


export default CustomerAdd;