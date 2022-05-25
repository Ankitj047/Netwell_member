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
import TableSortLabel from '@material-ui/core/TableSortLabel'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './Transaction.css'

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
  { id: 'transactionId', numeric: true, disablePadding: false, label: 'Transaction ID' },
  { id: 'createdDate', numeric: true, disablePadding: false, label: 'Transaction Date' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Payment Method' },
  { id: 'transactionAmount', numeric: true, disablePadding: false, label: 'Total Amount' },
  { id: 'authorizationMessage', numeric: true, disablePadding: false, label: ' Status' }
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
            {headCell.id == 'date_received' ? (
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

export default function TransactionDataTable(props) {
  console.log('=======my data table props===', props)
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('date_received')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const { tableData } = props
  useEffect(() => {
    console.log('hello component did mount')

      })

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
    <div className={'tableWrapper ' + classes.root}>
      <Paper className={'tableContainer ' + classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        {/* <div className="tablefixheight"> */}
        <TableContainer style={{ height: 300 }}>
          <Table
            className={'mainTable ' + classes.table}
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

                  return <Row key={tableData.name} row={tableData} />
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </div> */}
        <TablePagination
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
  const [open, setOpen] = React.useState(false)
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
    if (x.toString().startsWith('$')) {
      let substr = x.substr(1, x.length)
      return (
        '$' +
        parseFloat(substr)
          .toFixed(2)
          .toString()
      )
    } else {
      return x.toFixed(2)
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableRow className={'rowTable ' + classes.root}>
          <TableCell className="rowTableCell">
            <IconButton
              className="tableExpandIcon"
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open)
                              }}
            >
              {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" className="rowcellcolor rowTableCell">
            {row.transactionId ? row.transactionId : row.transaction_id}
          </TableCell>
          <TableCell align="left" className="sortrowcellcolor rowTableCell">
            {/* {row.createdDate} */}
            {getDate(row.createdDate ? row.createdDate : row.transaction_date)}
          </TableCell>
          <TableCell align="left" className="rowcellcolor rowTableCell">
            {row.payment_method ? row.payment_method : row.type}
          </TableCell>

          {row.transactionAmount ? (
            <TableCell align="left" className="rowcellcolor rowTableCell">
              ${numberWithCommas(floatconversion(row.transactionAmount))}
            </TableCell>
          ) : row.transaction_amount ? (
            <TableCell align="left" className="rowcellcolor rowTableCell">
              {numberWithCommas(floatconversion(row.transaction_amount))}
            </TableCell>
          ) : (
            <TableCell align="left" className="rowcellcolor rowTableCell">
              NA
            </TableCell>
          )}

          {/* className={'status_button ' + data.statusClass} */}
          {/* className={`${row.transactionStatus == 'FAIL' && 'inreview_button'}  ${row.transactionStatus == 'SUCCESS' && 'final_button'} `} */}

          <TableCell align="left" className="rowTableCell">
            {row.authorizationMessage ? (
              <span className={'web_status_button ' + row.authorizationMessage}>{row.authorizationMessage}</span>
            ) : row.authorization_message ? (
              <span className={'web_status_button ' + row.authorization_message}>{row.authorization_message}</span>
            ) : null}
          </TableCell>
        </TableRow>

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
                  <TableCell align="left" className="innerTh" style={{ width: '317px' }}>
                    Monthly Share Contribution
                  </TableCell>
                  <TableCell align="left" className="innerTh" style={{ width: '404px' }}>
                    UHF Monthly Membership Fee
                  </TableCell>
                  <TableCell align="left" className="innerTh" style={{ width: '382px' }}>
                    Application Fee
                  </TableCell>
                  {/* <TableCell align="left" className="innerTh">
                    &nbsp;
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                    &nbsp;
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                    &nbsp;
                    </TableCell> */}
                  <TableCell align="left" className="innerTh" style={{ width: '211px' }}>
                    Refund Amount
                  </TableCell>
                  {/* <TableCell align="left" className="innerTh">
                    &nbsp;
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                    &nbsp;
                    </TableCell> */}
                  <TableCell align="left" className="innerTh" style={{ width: '341px' }}>
                    Refund Description
                  </TableCell>

                  {/* <TableCell align="left" className="innerTh">
                    Consultation Fee
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                    Sharing Percentage
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                    EOS
                    </TableCell> */}
                </TableRow>
                {/* </TableHead> */}

                <TableBody>
                  {/* {row.inlineData.map((item) => ( */}
                  <TableRow
                                    >
                    <TableCell component="th" scope="row" className="innerTh blankCell" align="left">
                      &nbsp;
                    </TableCell>
                    <TableCell component="th" scope="row" className="innerTh" align="left">
                      {row.monthlyShare ? (
                        <>${numberWithCommas(floatconversion(row.monthlyShare))}</>
                      ) : row.monthly_share ? (
                        <>{numberWithCommas(floatconversion(row.monthly_share))}</>
                      ) : (
                        'NA'
                      )}
                      {/*${numberWithCommas(row.monthlyShare ? row.monthlyShare : row.monthly_share)}*/}
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      {row.uhfMonthlyFee ? (
                        <>${numberWithCommas(floatconversion(row.uhfMonthlyFee))}</>
                      ) : row.ufh_monthly_fee ? (
                        <>{numberWithCommas(floatconversion(row.ufh_monthly_fee))}</>
                      ) : (
                        'NA'
                      )}
                    </TableCell>
                    <TableCell align="left" className="innerTh">
                      {row.applicationFee ? (
                        <>${numberWithCommas(floatconversion(row.applicationFee))}</>
                      ) : row.application_fee ? (
                        <>{numberWithCommas(floatconversion(row.application_fee))}</>
                      ) : (
                        'NA'
                      )}
                    </TableCell>

                    {row.refundAmount != null ? (
                      <TableCell align="left" className="rowcellcolor rowTableCell">
                        {/* ${row.refundAmount} */}${numberWithCommas(row.refundAmount)}
                      </TableCell>
                    ) : (
                      <TableCell align="left" className="rowcellcolor rowTableCell">
                        NA
                      </TableCell>
                    )}

                    {row.refundDescription != null ? (
                      <TableCell align="left" className="rowcellcolor rowTableCell">
                        {row.refundDescription}
                      </TableCell>
                    ) : (
                      <TableCell align="left" className="rowcellcolor rowTableCell">
                        NA
                      </TableCell>
                    )}
                    {/* <TableCell align="left" className="innerTh">
                                     {row.refundAmount}
                                  </TableCell> */}
                    {/* <TableCell align="left" className="innerTh">
                      {row.refundDescription}
                    </TableCell> */}

                    {/* <TableCell align="left" className="innerTh">hello</TableCell>
                                  <TableCell align="left" className="innerTh">hello1</TableCell>
                                  <TableCell align="left" className="innerTh" style={{cursor:'pointer'}} onClick={() => setModalShow(true)}>VIEW
                                  </TableCell> */}
                  </TableRow>
                  {/* ))} */}
                </TableBody>

                {/* </Table> */}
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

function MyVerticallyCenteredModal(props) {
  console.log('===============MODAL PROPS+++++++', props)
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
