import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import { createBrowserHistory } from 'history'
import 'mdbreact/dist/css/mdb.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-ibm-plex-sans'
import Main from './main'
import reportWebVitals from './reportWebVitals'
import configureStore from './store/configureStore'
// import './components/UHS_Digital_Health_Card_v0.2/css/bootstrap.min.css'
import './styles/style.scss'




// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createBrowserHistory()

const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(history, initialState)

if (process.env.REACT_APP_BUILD == 'prod') {
    console.log = () => { }
}
// unregister();

ReactDOM.render(<Main store={store} history={history} />, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register(() => void[])
reportWebVitals();