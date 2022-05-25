import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import MuiTableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import FilterListIcon from '@material-ui/icons/FilterList'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from './Header'

const TableCell = withStyles({
  root: {
      }
})(MuiTableCell)

const usePaginationStyles = makeStyles({
  root: {
    'MuiTablePagination-caption': {
      color: 'red'
    }
  }
})

const useStyles = makeStyles({
  pending: {
    backgroundColor: '#feedec',
    color: '#c8372d'
  },
  denied: {
    backgroundColor: '#fef3e7',
    color: '#df9b52'
  },
  approved: {
    backgroundColor: '#37833b',
    color: '#edf6ee'
  }
})

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

function createData(row) {
  console.log('CHECK ROW', row)
  const { charge_number, first_name, last_name, date_paid, paid_provider_name, charged_amount, paid_amount, status } = row
  return {
    charge_number,
    first_name,
    date_paid,
    paid_provider_name,
    charged_amount,
    status,
    inlineData: [
      {
        first_name: first_name,
        last_name: last_name,
        member: '',
        date_paid: date_paid,
        refundedDate: '',
        checkNumber: '',
        paid_amount: paid_amount,
        summary: ``,
        eos: 'VIEW'
      }
    ]
  }
}

function Data(props) {
  const { row } = props
  console.log(row)
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  const btnClasses = useStyles()
  const paginate = usePaginationStyles()

  const getDate = date => {
    const isDateValid = moment(date)['_isValid']
    if (isDateValid) {
      return moment(date).format('MMMM D, YYYY')
    }
    return date
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root} paddingx={4}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="dataCellColor">
          {row.charge_number}
        </TableCell>
        <TableCell align="center" className="dataCellColor">
          {getDate(row.date_paid)}
        </TableCell>
        <TableCell align="center" className="dataCellColor">
          {row.paid_provider_name}
        </TableCell>
        <TableCell align="center" className="dataCellColor">
          ${row.charged_amount}
        </TableCell>
        <TableCell align="center" className="dataCellColor">
          <Button size="small" className={btnClasses.pending}>
            {' '}
            {row.status}{' '}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit style={{ backgroundColor: '#f6f6f6' }}>
            <Box>
              {/* style={{ backgroundColor: '#f6f6f6' }} */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="innerTh">
                      Member
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      Paid Date
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      Refunded Date
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      Check Number
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      Member Paid
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      Summary
                    </TableCell>
                    <TableCell align="center" className="innerTh">
                      EOS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.inlineData.map(item => (
                    <TableRow key={item.checkNumber}>
                      <TableCell component="th" scope="row" className="innerTd">
                        {item.first_name} {item.last_name}
                      </TableCell>
                      <TableCell className="innerTd">{getDate(item.date_paid)}</TableCell>
                      <TableCell align="left" className="innerTd">
                        {item.refundedDate}
                      </TableCell>
                      <TableCell align="left" className="innerTd">
                        {item.checkNumber}
                      </TableCell>
                      <TableCell align="left" className="innerTd">
                        {item.paid_amount}
                      </TableCell>
                      <TableCell align="left" className="innerTd">
                        {item.summary}
                      </TableCell>
                      <TableCell align="center" className="innerTd">
                        <Button size="small" className={btnClasses.denied}>
                          {item.eos}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Data.propTypes = {
  
  row: PropTypes.shape({
    date_paid: PropTypes.string.isRequired,
    paid_provider_name: PropTypes.string.isRequired,
    charged_amount: PropTypes.string.isRequired,
    inlineData: PropTypes.arrayOf(
      PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        member: PropTypes.string.isRequired,
        date_paid: PropTypes.string.isRequired,
        refundedDate: PropTypes.string.isRequired,
        checkNumber: PropTypes.number.isRequired,
        paid_amount: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        eos: PropTypes.string.isRequired
      })
    ).isRequired,
    charge_number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
}

const rows = [
    ]

const dynamicRows = () => {
  const arr = []
  myrows.forEach((item, i) => {
    createData(item)
  })
}
const myrows = [
  {
    member_id: '600017',
    charge_number: '20367',
    first_name: 'CHARLES',
    last_name: 'CASH',
    date_paid: 'None',
    date_received: '2020-04-20',
    status: 'Logged',
    charged_amount: '0.00',
    paid_amount: '0.00',
    paid_provider_name: 'VITALCARE FP LLC'
  },
  {
    member_id: '600017',
    charge_number: '20721',
    first_name: 'CHARLES',
    last_name: 'CASH2',
    date_paid: '2020-05-20',
    date_received: '2020-04-20',
    status: 'Logged',
    charged_amount: '0.00',
    paid_amount: '0.00',
    paid_provider_name: 'VITALCARE FP LLC'
  }
]


export default class WebMyNeeds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      rowsPerPage: 5,
      page: 0
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
    this.setState({ page: 0 })
  }

  componentDidMount = () => {
    const arr = []
    myrows.forEach(item => {
      arr.push(createData(item))
    })
    this.setState(
      {
        rows: arr
      },
      () => {
        console.log('UPDATED', this.state)
      }
    )
        const email = 'leah@millerwaldrop.com'
    const URL = process.env.REACT_APP_NEW_BASE_URL + `/memberportal/getMyneedsReport/${email}`
                    
                            
              }

  render() {
    return (
      <Container fluid style={{ marginTop: '100px' }}>
        <Header name={'MyNeeds'} />

        <Row className="d-flex justify-content-center ">
          <Col md={11} className="border bg-white p-4 ">
            <Row>
              <Col md={12}>
                {/* <img src={require('../Images/My Needs.svg')} /> */}
                <span className="font-roboto-reg title mb-4"> My Needs </span>
              </Col>
              <Col md={12} className="my-4 d-flex justify-content-between">
                <div className="pl-4">
                  <span className="font-roboto-reg font-weight-bold" style={{ fontSize: '16px', color: '#000000' }}>
                    {' '}
                    Submitted expenses{' '}
                  </span>
                </div>
                <div className="cellColor">
                  <FilterListIcon style={{ cursor: 'pointer' }} />
                </div>
              </Col>
              <Col md={12}></Col>
            </Row>

            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className="cellColor"> No. </TableCell>
                    <TableCell align="center" className="cellColor">
                      <TableSortLabel active={true}>Date Of Service</TableSortLabel>
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      Provider
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      Charged
                    </TableCell>
                    <TableCell align="center" className="cellColor">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows ? (
                    this.state.rows.map(item => <Data key={item.member_id} row={item} />)
                  ) : (
                    <TableRow paddingx={4}>NO DATA FOUND</TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.state.rows.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            labelRowsPerPage={`Show ${this.state.rowsPerPage} rows`}
                        /> */}
          </Col>
        </Row>
      </Container>
    )
  }
}
