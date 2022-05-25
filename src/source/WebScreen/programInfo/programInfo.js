import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { Component } from 'react'
import style from './style.css'

export default class ProgramInfo extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      cardDetails: this.props.expensData,
      expensData: this.props.cardDetails,
      programInfo: this.props.programInfo
    }
  }

  render() {
    return (
      <div className={style.root} style={{ maxHeight: '90vh', overflowY: 'scroll', backgroundColor: '#fff' }}>
        <Grid container className={style.mainContainer}>
          <Grid container style={{ margin: '10px' }} item xs={12} spacing={2}>
            <div className="expense-section w-100" style={{ backgroundColor: '#fafafa' }}>
              <div className={style.root_tab}>
                <Paper className={style.paper}>
                  <Table className={style.table} size="small" aria-label="a dense table">
                    <TableBody className={style.tableHead}>
                      <TableRow>
                        <TableCell className="w-50" component="th" scope="row">
                          Program Name
                        </TableCell>
                        <TableCell
                          className="w-50 break-word"
                          component="th"
                          scope="row"
                          dangerouslySetInnerHTML={{ __html: this.state.programInfo.programName }}
                        ></TableCell>{' '}
                      </TableRow>
                      <TableRow>
                        <TableCell className={style.tableHeadCell}>Non-Shareable Amount (NSA) for family</TableCell>
                        <TableCell
                          className="w-50 break-word"
                          component="th"
                          scope="row"
                          dangerouslySetInnerHTML={{ __html: this.state.programInfo.non_Shareable_Amount }}
                        ></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={style.tableHeadCell}>Physician and Ancillary Services Network</TableCell>
                        <TableCell
                          className="w-50 break-word"
                          component="th"
                          scope="row"
                          dangerouslySetInnerHTML={{ __html: this.state.programInfo.physician_and_Ancillary_Services_Network }}
                        ></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </div>

            {}

            <Grid item xs={12} md={12} lg={12} p={0} className="mt-4">
              <h5>Eligible Services</h5>
            </Grid>
            <div className="expense-section w-100" style={{ backgroundColor: '#fafafa' }}>
              <div className={style.root_tab}>
                <Paper className={style.paper}>
                  <Table className={style.table} size="small" aria-label="a dense table">
                    <TableHead className={style.tableHead}>
                      <TableRow>
                        <TableCell className={style.tableHeadCell}>Eligible Services</TableCell>
                        <TableCell className={style.tableHeadCell}>Amount&nbsp;($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ maxHeight: '10vh', overflowY: 'scroll' }}>
                      {this.state.cardDetails.map(col =>
                        col.fieldValue ? (
                          <TableRow key={col.idcardField}>
                            <TableCell
                              className="w-50"
                              component="th"
                              scope="row"
                              dangerouslySetInnerHTML={{ __html: col.idcardField }}
                            ></TableCell>
                            <TableCell
                              className="w-50"
                              component="th"
                              scope="row"
                              dangerouslySetInnerHTML={{ __html: col.fieldValue }}
                            ></TableCell>
                          </TableRow>
                        ) : (
                          <TableRow key={col.idcardField}>
                            <TableCell
                              style={{ background: 'aliceblue' }}
                              colSpan={2}
                              component="th"
                              scope="row"
                              dangerouslySetInnerHTML={{ __html: col.idcardField }}
                            ></TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </div>

            <Grid item xs={12} md={12} lg={12} className="mt-4">
              <h5>Expense Limit</h5>
            </Grid>
            <div className="expense-section w-100">
              <div className={style.root_tab}>
                <Paper className={style.paper}>
                  <Table className={style.table} size="small" aria-label="a dense table">
                    <TableHead className={style.tableHead}>
                      <TableRow>
                        <TableCell className={style.tableHeadCell}>Expense Limit</TableCell>
                        <TableCell className={style.tableHeadCell}>Amount&nbsp;($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.expensData.map(col =>
                        col.fieldValue ? (
                          <TableRow key={col.idcardField}>
                            <TableCell
                              className="w-50"
                              component="th"
                              scope="row"
                              dangerouslySetInnerHTML={{ __html: col.idcardField }}
                            ></TableCell>
                            <TableCell
                              className="w-50"
                              component="th"
                              scope="row"
                              dangerouslySetInnerHTML={{ __html: col.fieldValue }}
                            ></TableCell>
                          </TableRow>
                        ) : (
                          <TableRow key={col.idcardField}>
                            <TableCell
                              style={{ background: 'aliceblue' }}
                              colSpan={2}
                              component="th"
                              scope="row"
                              dangerouslySetInnerHTML={{ __html: col.idcardField }}
                            ></TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Paper>
                <p
                  className="p-2"
                  style={{
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: '400',
                    lineHeight: '1.43',
                    marginBottom: '40px',
                    backgroundColor: '#fff'
                  }}
                >
                  Please refer to the Sharing Guidelines for detailed information. In case of any discrepancies, the Sharing Guidelines will
                  prevail.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
