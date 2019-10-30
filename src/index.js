import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

class ListaTarefas extends React.Component{
    constructor(){
        super()
        this.state = {
            tarefas: [],
            inputTarefa: ""
            // description: [],
            // inputDescription: ""
        }
        this.addTarefa = (ev) => {
            ev.preventDefault()
            const tarefas = this.state.tarefas.slice() //slice serve para recortar e inserir em outra constante
            tarefas.push(this.state.inputTarefa)
            this.setState({
                tarefas: tarefas,
                inputTarefa: ""
            })
        }

        // this.addDescription = (ev) => {
        //     ev.preventDefault()
        //     const description = this.state.description.slice() 
        //     description.push(this.state.inputDescription)
        //     this.setState({
        //         description: description,
        //         inputDescription: ""
        //     })
        // }

        this.editTarefa = (index, valor) => {
            const tarefas = this.state.tarefas.slice()
            tarefas[index] = valor
            this.setState({tarefas})
        }

        // this.editDescription = (index, valor) => {
        //     const description = this.state.description.slice()
        //     description[index] = valor
        //     this.setState({description})
        // }

        this.removeTarefa = (index) => {
            const tarefas = this.state.tarefas.slice()
            tarefas.splice(index, 1)
            this.setState({tarefas})
        }

        // this.removeDescription = (index) => {
        //     const description = this.state.description.slice()
        //     description.splice(index, 1)
        //     this.setState({description})
        // }

        this.onChange = (ev) => {
            ev.preventDefault()
            const state = Object.assign({}, this.state)
            state[ev.target.name] = ev.target.value
            this.setState(state)
        }
    }
    render(){
        return(
            <ListView
            tarefas = {this.state.tarefas}
            description= {this.state.description}
            inputTarefa = {this.state.inputTarefa}
            // inputDescription= {this.state.inputDescription}
            onChange = {this.onChange}
            addTarefa = {this.addTarefa}
            // addDescription = {this.addDescription}
            removeTarefa = {this.removeTarefa}
            // removeDescription = {this.removeDescription}
            editTarefa = {this.editTarefa}
            // editDescription = {this.editDescription}
            />
        )
    }

}

const ListView = (props) => (
   <div className="lista">
    <h1>Lista de Tarefas</h1>
    <input name="inputTarefa" value={props.inputTarefa} onChange={props.onChange}></input>
    <button onClick={props.addTarefa}>Adicionar Tarefa</button>
    
            
    {
        props.tarefas.map((tarefa, index) => (
            <ListViewItem
                tarefa={tarefa}
                index={index}
                removeTarefa={props.removeTarefa}
                editTarefa={props.editTarefa} 
                />
        ))
        
    }
       
   </div>
)

class ListViewItem extends React.Component {
    constructor(props){
         super(props)
         this.state = {
             edit: false,
             texto: props.tarefa
         }

        this.removeTarefa = () => {
            this.props.removeTarefa(this.props.index)
        }
        this.editTarefa = () => {
            this.props.editTarefa(this.props.index, this.state.texto)
            this.setState({edit: false})
        }
        this.abrirForm = () => {
            this.setState({edit: true})
        }
        this.fecharForm = () => {
            this.setState({edit: false})
        }

        this.onChange = (ev) => {
            this.setState({texto: ev.target.value})
        }
    }

    render (){
        if(!this.state.edit){
            return (
                <div className="btn">
                    <p>
                    {this.props.index+' Tarefa'} - {this.props.tarefa} - 
                    <span id="alterar"onClick={this.abrirForm}>Alterar</span>
                    <span id="excluir" onClick={this.removeTarefa}>Excluir</span>
                    </p>
                </div>
                
            )
        }
            return (
                <div className="btnreturn">
                    {this.props.index+1} <input value={this.state.texto} onChange={this.onChange}></input>
                    <span id="salvar" onClick={this.editTarefa}>Salvar</span>
                    <span id="cancelar"onClick={this.fecharForm}>Cancelar</span>
                    
                </div>
            )
    }
}


ReactDOM.render(
    <ListaTarefas />, document.getElementById('root')
);

