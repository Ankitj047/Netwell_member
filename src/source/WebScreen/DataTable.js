import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme, lighten, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import shareNeeds from '../../assets/images/shareNeeds.svg'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './MyNeeds.css'

function createData(no, date_of_service, provider, charged, paid, status) {
  return { no, date_of_service, provider, charged, paid, status }
}

const theme = createMuiTheme({
  MuiTableCell: {
    paddingLeft: '30px'
  }
})

const rows = [
  createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43, 'FINAL'),
  createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100, 'IN REVIEW'),
  createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43, 'FINAL'),
  createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100, 'IN REVIEW'),
  createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43, 'FINAL'),
  createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100, 'IN REVIEW'),
  createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43, 'FINAL'),
  createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100, 'IN REVIEW'),
  createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43, 'FINAL'),
  createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100, 'IN REVIEW')
                      ]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
          
  { id: 'arrow', numeric: true, disablePadding: false, label: '' },
  { id: 'bill_key', numeric: true, disablePadding: false, label: 'Expense Number' },
    { id: 'first_name', numeric: false, disablePadding: false, label: 'Member' },
  { id: 'service_date', numeric: true, disablePadding: false, label: 'Date Of Service' },
  { id: 'paid_provider_name', numeric: false, disablePadding: false, label: 'Provider' },
  { id: 'charged_amount', numeric: true, disablePadding: false, label: ' Charged' },
        { id: 'status', numeric: true, disablePadding: false, label: ' Status' }
]

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow className="tableHeadRow">
        {/* <TableCell padding="checkbox">
         <Checkbox
           indeterminate={numSelected > 0 && numSelected < rowCount}
           checked={rowCount > 0 && numSelected === rowCount}
           onChange={onSelectAllClick}
           inputProps={{ 'aria-label': 'select all desserts' }}
         />
       </TableCell> */}
        {headCells.map(headCell => (
          <>
            {headCell.id == 'service_date' ? (
              <TableCell
                key={headCell.id}
                                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
                className="sortheadercellColor tableHeader"
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  className="headercellColor tableHeader"
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ) : (
              <TableCell
                key={headCell.id}
                                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
                className="headercellColor tableHeader"
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  className="headercellColor tableHeader"
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}))





const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

export default function DataTable(props) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('service_date')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { tableData } = props
  useEffect(() => {})

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={'tableContainer ' + classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        {/* <div className="tablefixheight"> */}
        <TableContainer style={{ height: 360 }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tableData, index) => {
                  const isItemSelected = isSelected(tableData.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return <Row open={props.open} key={tableData.name} row={tableData} />
                })}
              {/* {emptyRows > 0 && (
               <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                 <TableCell colSpan={6} />
               </TableRow>
             )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <span className="footerTextLeft">
          **For complete status, please refer to the Explanation of Sharing (EOS) mailed to your address on file
        </span>

        <TablePagination
          style={{ position: 'relative' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(props.open)
  const classes = useRowStyles()

  const [modalShow, setModalShow] = React.useState(false)

  const getDate = date => {
    const isDateValid = moment(date)['_isValid']
    if (isDateValid) {
      return moment(date).format('MMMM D, YYYY')
    }
    return date
  }

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const floatconversion = x => {
    return x.toFixed(2)
  }

    const combineDate = (x, y) => {
    if (x == y) {
      return x
    }

    const z = x + '-' + y
    return z
  }

  const convertToString = x => {
    console.log('Type Of X')
        console.log(x)
      }

                
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableRow className={'rowTable ' + classes.root}>
          <TableCell className="rowTableCell">
            <IconButton className="tableExpandIcon" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" className="rowcellcolor rowTableCell">
            {row.bill_key}
          </TableCell>
          <TableCell component="th" scope="row" className="rowcellcolor rowTableCell">
            {row.first_name} {row.last_name}
          </TableCell>
          <TableCell align="left" className="sortrowcellcolor rowTableCell">
            {getDate(row.start_of_service_date)}
          </TableCell>
          <TableCell align="left" className="rowcellcolor rowTableCell">
            {row.paid_provider_name}
          </TableCell>
          <TableCell align="left" className="rowcellcolor rowTableCell">
            ${row.charged_amount}
          </TableCell>

          <TableCell align="left" className="rowTableCell">
            {row.status == 'Paid' || row.status == 'Denied' ? (
              <span className={'web_status_button Audit'}>Complete</span>
            ) : (
              <span className={'web_status_button Logged'}>Processing</span>
            )}
          </TableCell>
        </TableRow>

        {/* The Following table row is used to for the information of the dropdown rows that explain the EOS */}
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" component="tr" unmountOnExit style={{ backgroundColor: '#f6f6f6' }}>
              <Box>
                {/* <Table className="collapseTableContainer" size="small" aria-label="purchases">
               <TableHead> */}
                <TableRow>
                  <TableCell component="td" align="left" className="innerTh blankCell" style={{ width: '4%' }}>
                    &nbsp;
                  </TableCell>
                  {/* <TableCell align="left" className="innerTh" style={{ width: '317px' }}>
                    Date(s) of Service
                  </TableCell> */}
                  {/* <TableCell align="left" className="innerTh" style={{ width: '404px' }}>
                    Provider{' '}
                  </TableCell> */}
                  <TableCell align="left" className="innerTh" style={{ width: '300px' }}>
                    Billed Charges
                  </TableCell>
                  <TableCell align="left" className="innerTh" style={{ width: '341px' }}>
                    Ineligible for Sharing
                  </TableCell>

                  <TableCell align="left" className="innerTh" style={{ width: '211px' }}>
                    Discount to Billed Charges
                  </TableCell>

                  <TableCell align="left" className="innerTh" style={{ width: '341px' }}>
                    Eligible for Sharing
                  </TableCell>

                  <TableCell align="left" className="innerTh" style={{ width: '250px' }}>
                    Non-Shareable Amount
                  </TableCell>

                  <TableCell align="left" className="innerTh" style={{ width: '341px' }}>
                    Consultation Fee
                  </TableCell>

                  <TableCell align="left" className="innerTh" style={{ width: '150px' }}>
                    Member Responsibility
                  </TableCell>

                  {/* <TableCell align="left" className="innerTh" style={{ width: '341px' }}>
                    Shared By UHF
                  </TableCell> */}
                </TableRow>
                {/* </TableHead> */}

                <TableBody>
                  {/* {row.inlineData.map((item) => ( */}
                  <TableRow>
                    <TableCell className="innerTh" align="left">
                      &nbsp;
                    </TableCell>
                    {/* <TableCell align="left" className="innerTh">
                      {combineDate(row.start_of_service_date, row.end_date_of_service)}
                    </TableCell> */}
                    {/* <TableCell component="th" scope="row" className="innerTh" align="left">
                      {
                                                row.paid_provider_name
                      }
                    </TableCell> */}

                    <TableCell align="left" className="innerTh">
                      {<>${row.charged_amount}</>}
                    </TableCell>

                    <TableCell align="left" className="innerTh">
                      {<>${row.ineligible_amount}</>}
                    </TableCell>

                    <TableCell align="left" className="innerTh">
                      {<>${row.repricing_amount}</>}
                    </TableCell>

                    <TableCell align="left" className="innerTh">
                      <>${row.eligible_for_sharing}</>
                    </TableCell>

                    <TableCell align="left" className="innerTh">
                      {<>${row.nsa ? row.nsa : '0'}</>}
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      {<>${row.consultation_fee}</>}
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      {<>${row.member_responsibility}</>}
                    </TableCell>

                    {/* <TableCell align="left" className="innerTh">
                      {<>${row.paid_amount}</>}
                    </TableCell> */}

                    {/* <TableCell align="left" className="innerTh">
                                    {row.refundAmount}
                                 </TableCell> */}
                    {/* <TableCell align="left" className="innerTh">
                     {row.refundDescription}
                   </TableCell> */}
                  </TableRow>
                  {/* ))} */}
                  </TableBody>

                  {/* <TableBody colSpan={12}>
                   <TableRow style={{backgroundColor:'#EEEEEE'}}>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds">
                    <div style={{ width:27, paddingLeft: 6}}>
                      <img src={shareNeeds} width={50}/>
                    </div>
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds" colSpan={2}>
                      <p style={{marginTop:16, fontWeight:"500", color: "#454d58"}}>
                      Shared by UHF Members <b style={{  fontWeight:"bold", color: "#00000", fontSize:"16px",}}> ${row.eligible_for_sharing} </b> 
                      </p> 
                    </TableCell>
                    
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds" colSpan={2}>
                      <p style={{width:"auto", marginTop:16, fontWeight:"500", color: "#454d58"}}>
                      No. of Contributing Members  <b style={{  fontWeight:"bold", color: "#00000", fontSize:"16px",}}> 12 </b> 
                      
                      </p> 
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds" colSpan={2}>
                    <button className="ButtonBGNeeds">
                      <p style={{marginTop:5}} className="captionNeeds">SEND THANK YOU NOTE</p>
                      </button>
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds">
                      
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds" colSpan={2}>
                      
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds">
                   
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds">
                   
                    </TableCell>
                    <TableCell padding='1px' align="left" className="innerTh shareNeeds">
                   
                    </TableCell>
                    
                    </TableRow>
                  </TableBody> */}


         
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} data={row} />
      </ThemeProvider>
    </React.Fragment>
  )
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

const myrowsjsondata = [
  {
    member_id: '600016',
    bill_key: '20116',
    first_name: 'CHARLES',
    last_name: 'CASH',
    date_paid: 'None',
    date_received: '2020-04-20',
    status: 'IN REVIEW',
    charged_amount: '0.00',
    paid_amount: '0.00',
    paid_provider_name: 'aa'
  },
  {
    member_id: '600017',
    bill_key: '2046',
    first_name: 'CHARLES',
    last_name: 'CASH2',
    date_paid: '2020-05-20',
    date_received: '2020-04-21',
    status: 'FINAL',
    charged_amount: '100.00',
    paid_amount: '10.00',
    paid_provider_name: 'bb'
  },
  {
    member_id: '600018',
    bill_key: '20118',
    first_name: 'CHARLES',
    last_name: 'CASH',
    date_paid: 'None',
    date_received: '2020-04-22',
    status: 'FINAL',
    charged_amount: '200.00',
    paid_amount: '20.00',
    paid_provider_name: 'cc'
  },
  {
    member_id: '600019',
    bill_key: '2053',
    first_name: 'CHARLES',
    last_name: 'CASH2',
    date_paid: '2020-05-20',
    date_received: '2020-04-23',
    status: 'FINAL',
    charged_amount: '300.00',
    paid_amount: '30.00',
    paid_provider_name: 'VITALCARE FP LLC'
  },
  {
    member_id: '600018',
    bill_key: '201337',
    first_name: 'CHARLES',
    last_name: 'CASH',
    date_paid: 'None',
    date_received: '2020-04-24',
    status: 'IN REVIEW',
    charged_amount: '400.00',
    paid_amount: '40.00',
    paid_provider_name: 'VITALCARE FP LLC'
  },
  {
    member_id: '600019',
    bill_key: '201857',
    first_name: 'CHARLES',
    last_name: 'CASH2',
    date_paid: '2020-05-20',
    date_received: '2020-04-25',
    status: 'IN REVIEW',
    charged_amount: '0.00',
    paid_amount: '0.00',
    paid_provider_name: 'VITALCARE FP LLC'
  }
]

function MyVerticallyCenteredModal(props) {
  const { data } = props
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">My Needs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{data.paid_provider_name}</h4>
        <p>{data.member_id}</p>
        <p>{data.charged_amount}</p>
        <p>{data.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
