import React, { Component } from 'react';
import BlocBuilder from 'bloc-builder-react';
import AppBloc from '../bloc/appBloc.js';
import '../styles/index.css';
import { CustomContainer } from './customContainer';

export default class App extends Component {
  constructor() {
    super();
    this.appBloc = new AppBloc();
  }

  async componentDidMount() {
    let localData = window.localStorage.getItem('data');
    if (localData) {
      this.appBloc.getDataFromLocalStorage();
    } else {
      await this.appBloc.loadData();
    }
  }

  render() {
    return (
      <>
        <center>
          <header className="page-header">
            <h1 className="page-title">Hi Platform</h1>
            <h2 className="page-headline">Prova Front-end</h2>
          </header>
        </center>
        <div className="main">
          <div className="list">
            <BlocBuilder
              subject={this.appBloc.parentListController}
              builder={(snapshot) => {
                if (snapshot.data) {
                  this.appBloc.storeDataOnLocalStorage();
                  let parentList = snapshot.data;
                  return parentList.map((parent, index) => {
                    return (
                      <div key={index} className="container-wrapper">
                        <CustomContainer
                          self={this}
                          parent={parent}
                        />
                      </div>
                    )
                  })
                } else return null
              }}
            />
          </div>
        </div>
      </>
    )
  }
}