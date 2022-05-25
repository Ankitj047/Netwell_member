import GetAppIcon from '@material-ui/icons/GetApp'
import { Document, Font, Image, Page, pdf, Text, View } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import moment from 'moment'
import React, { Component } from 'react'
import { gethealthcard, getNetworkName } from '../ApiCall'
import AFMCLogo from '../Images/Card/AZFMC_logo.png'
import PHCSLogo from '../Images/Card/image-4@3x.png'
import Sharing from '../Images/Card/sharing.png'
import Thanku from '../Images/Card/thank-you-for.png'
import logo from '../Images/Card/UHS_Logo_RGB_600px_200px.png'
import BgImageHL from '../Images/Drawer/card_bg_02.png'
import BgImage from '../Images/Drawer/group-51.png'

// Font.register({ family: 'FamilyName', fontStyle: 'italic', fontWeight: 'bold' });
Font.register({
  family: 'Roboto',
  fonts: [
    // font-style: normal, font-weight: normal
    { fontStyle: 'italic' },
    { fontStyle: 'italic', fontWeight: 700 }
  ]
})
var topM = 0
const PrintDoc = ({ cardId, network, contactNumber, showEmpId, data, prefix, membersince, groupno, planinfo, surgeryText }) => (
  <Document>
    <Page size="A5">
      <View
        style={{
          minWidth: '328px',
          minHeight: '230px',
          display: 'block',
          height: '188px',
          width: '179px',
          position: 'relative',
          padding: '20',
          border: '1',
          margin: 'auto',
          borderColor: '#eeeeee'
        }}
      >
        {network == 'healthyLife' || network == 'smartshare25' || network == 'smartshare50' ? (
          <Image
            source={BgImageHL}
            style={{ position: 'absolute', minWidth: '179px', minHeight: '230px', display: 'block', height: '188px', width: '179px' }}
          ></Image>
        ) : (
          <Image
            source={BgImage}
            style={{ position: 'absolute', minWidth: '179px', minHeight: '230px', display: 'block', height: '188px', width: '179px' }}
          ></Image>
        )}

        <Image
          source={logo}
          style={{
            position: 'absolute',
            minWidth: '108px',
            minHeight: '34px',
            display: 'block',
            height: '34px',
            width: '108px',
            top: '12px',
            left: '18px'
          }}
        ></Image>

        {network == 'AFMC' ? (
          <Image
            source={AFMCLogo}
            style={{
              position: 'absolute',
              minWidth: '134px',
              minHeight: '52px',
              display: 'block',
              height: '52px',
              width: '134px',
              top: '4px',
              right: '13px'
            }}
          ></Image>
        ) : null}

        {network == 'PHCS' ||
        network == 'Smartshare' ||
        network == 'healthyLife' ||
        network == 'smartshare25' ||
        network == 'smartshare50' ? (
          <Image
            source={PHCSLogo}
            style={{
              position: 'absolute',
              minWidth: '134px',
              minHeight: '52px',
              display: 'block',
              height: '52px',
              width: '134px',
              top: '4px',
              right: '13px'
            }}
          ></Image>
        ) : null}

        {data &&
          data.memberIdCardList.map((data, index) => (
            <>
              {index == 0 ? (
                <>
                  <Text style={{ position: 'absolute', top: '58px', left: '18px', fontSize: '9', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '70px', left: '18px', fontSize: '8', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : null}
            </>
          ))}

        {data &&
          data.memberIdCardList.map((data, index) => (
            <>
              {index != 0 && index == 1 ? (
                <>
                  <Text style={{ position: 'absolute', top: '92px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '92px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 2 ? (
                <>
                  <Text style={{ position: 'absolute', top: '102px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '102px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 3 ? (
                <>
                  <Text style={{ position: 'absolute', top: '112px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '112px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 4 ? (
                <>
                  <Text style={{ position: 'absolute', top: '122px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '122px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 5 ? (
                <>
                  <Text style={{ position: 'absolute', top: '132px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '132px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 6 ? (
                <>
                  <Text style={{ position: 'absolute', top: '142px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '142px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 7 ? (
                <>
                  <Text style={{ position: 'absolute', top: '152px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '152px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 8 ? (
                <>
                  <Text style={{ position: 'absolute', top: '162px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '162px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 9 ? (
                <>
                  <Text style={{ position: 'absolute', top: '172px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '172px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : index != 0 && index == 10 ? (
                <>
                  <Text style={{ position: 'absolute', top: '182px', left: '18px', fontSize: '7', color: '#000000' }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={{ position: 'absolute', top: '182px', left: '110px', fontSize: '7', color: '#98335b' }}>
                    {prefix}
                    {showEmpId ? data.empId : data.memberId}
                  </Text>
                </>
              ) : null}
            </>
          ))}

        <Text style={{ position: 'absolute', top: '58px', left: '180px', fontSize: '9', color: '#000000' }}>Program Details</Text>
        <Text style={{ position: 'absolute', top: '70px', left: '180px', fontSize: '7', color: '#000000' }}>Member since</Text>
        <Text style={{ position: 'absolute', top: '80px', left: '180px', fontSize: '7', color: '#000000' }}>Group Number</Text>
        <Text style={{ position: 'absolute', top: '90px', left: '180px', fontSize: '7', color: '#000000' }}>Program ID</Text>

        <Text style={{ position: 'absolute', top: '70px', left: '265px', fontSize: '7', color: '#98335b' }}>{membersince}</Text>
        <Text style={{ position: 'absolute', top: '80px', left: '265px', fontSize: '7', color: '#98335b' }}>{groupno}</Text>
        <Text style={{ position: 'absolute', top: '90px', left: '265px', fontSize: '7', color: '#98335b' }}>
          {data.memberIdCardList[0].planId}
        </Text>

        {planinfo &&
          planinfo.map((data, index) => (
            <View style={{ top: '75px' }}>
              {data.idcardField == 'Surgery' || data.idcardField == 'Surgery ' ? (
                <View style={{ display: 'flex', marginTop: '10px' }}>
                  <Text style={{ position: 'absolute', left: '160px', fontSize: '7', color: '#000000', display: 'flex' }} break>
                    {data.idcardField}
                  </Text>
                  <Text style={{ position: 'absolute', left: '245px', width: '60px', fontSize: '7', color: '#98335b' }} break>
                    {surgeryText}
                  </Text>
                </View>
              ) : data.idcardField != 'group' &&
                data.idcardField != 'prefix' &&
                data.idcardField != 'Surgery EasyShare Limit per surgery' &&
                data.idcardField != 'Chiropractic' &&
                data.idcardField != 'card id' &&
                data.idcardField != 'contact number' &&
                data.idcardField != 'Program Details' ? (
                <View style={{ display: 'flex', marginTop: '10px' }}>
                  <Text style={{ position: 'absolute', left: '160px', fontSize: '7', color: '#000000', display: 'flex' }} break>
                    {data.idcardField}
                  </Text>
                  <Text style={{ position: 'absolute', left: '245px', fontSize: '7', color: '#98335b' }} break>
                    {data.fieldValue}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}

        {network == 'PHCS' || network == 'healthyLife' || network == 'smartshare25' || network == 'smartshare50' ? (
          <Text
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '18px',
              fontSize: '6',
              color: '#000000',
              width: '290px',
              textAlign: 'center'
            }}
          >
            Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We
            are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions{' '}
            {contactNumber}
          </Text>
        ) : null}
        {network == 'Smartshare' ? (
          <Text
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '18px',
              fontSize: '6',
              color: '#000000',
              width: '290px',
              textAlign: 'center'
            }}
          >
            Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We
            are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions{' '}
            {contactNumber}
          </Text>
        ) : null}
        {network == 'AFMC' ? (
          <Text
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '18px',
              fontSize: '6',
              color: '#000000',
              width: '290px',
              textAlign: 'center'
            }}
          >
            Universal HealthShare plans from Universal Health Fellowship are health care cost sharing ministry programs, not insurance. We
            are IN NETWORK for Multiplan/PHCS Practitioner & Ancillary Network. Providers & Members confirmations and questions{' '}
            {contactNumber}
          </Text>
        ) : null}
      </View>
    </Page>
    <Page size="A5">
      <View
        style={{
          minWidth: '328px',
          minHeight: '188px',
          display: 'block',
          height: '258px',
          width: '179px',
          position: 'relative',
          padding: '20',
          border: '1',
          margin: 'auto',
          borderColor: '#eeeeee'
        }}
      >
        {network == 'PHCS' ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '22px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Customer Service call: {contactNumber}
            </Text>
            <Text style={{ position: 'absolute', top: '24px', right: '14px', fontSize: '8', color: '#ffffff', backgroundColor: '#4a0b4d' }}>
              EDI #53684
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '30px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              To find a provider visit FindProvider.UniversalHealthFellowship.org
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '43px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '298px',
                textAlign: 'left'
              }}
            >
              Providers, send needs to: P.O Box 211223, Eagon, MN 55121
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '55px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital Confinements, All
              Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services) Cancer Treatment and Oncology
              Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal Tunnel Treatments. In addition,
              Pre-certification to confirm medical necessity is required before these procedures may be eligible for sharing: Transplant of
              any organ or tissue, a coronary bypass or graft of any kind, or a knee or hip replacement. For Medical Emergencies Seek
              Immediate Medical Help.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '100px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full for services
              rendered. Reimbursement for hospital facility services is determined at a percentage of the facilityís Medicare allowable
              amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of an applicable CMS fee schedule, in
              accordance with published UHF Sharing Guidelines. Acceptance of sharing payment for Eligible Expenses constitutes waiver of
              facility/provider right to balance bill patient.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '140px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              See applicable Sharing Guidelines for more details. Universal Health Fellowship (www.UniversalHealthFellowship.org) is a
              not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare
              is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is
              not a discount card or program.
            </Text>
            <Text style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '5.5', color: '#000000' }}>{cardId}</Text>
          </>
        ) : null}

        {network == 'healthyLife' ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '22px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Customer Service call: {contactNumber}
            </Text>
            {/* <Text style={{position: "absolute", top:"24px", right:"14px", fontSize:'8', color:'#ffffff',backgroundColor:"#4a0b4d"}}>EDI #53684</Text> */}
            <Text
              style={{
                position: 'absolute',
                top: '30px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              To find a provider visit FindProvider.UniversalHealthFellowship.org
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '43px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '298px',
                textAlign: 'left'
              }}
            >
              Providers, send needs requests to: 4555 Mansell Road, Suite 300 Alpharetta, GA 30022
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '55px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital Confinements, All
              Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services) Cancer Treatment and Oncology
              Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal Tunnel Treatments. In addition,
              Pre-certification to confirm medical necessity is required before these procedures may be eligible for sharing: Transplant of
              any organ or tissue, a coronary bypass or graft of any kind, or a knee or hip replacement. For Medical Emergencies Seek
              Immediate Medical Help.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '100px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full for services
              rendered. Reimbursement for hospital facility services is determined at a percentage of the facilityís Medicare allowable
              amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of an applicable CMS fee schedule, in
              accordance with published UHF Sharing Guidelines. Acceptance of sharing payment for Eligible Expenses constitutes waiver of
              facility/provider right to balance bill patient.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '140px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              See applicable Sharing Guidelines for more details. Universal Health Fellowship (www.UniversalHealthFellowship.org) is a
              not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare
              is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is
              not a discount card or program.
            </Text>
            <Text style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '5.5', color: '#000000' }}>{cardId}</Text>
          </>
        ) : null}

        {network == 'smartshare25' ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '22px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Customer Service call: {contactNumber}
            </Text>
            {/* <Text style={{position: "absolute", top:"24px", right:"14px", fontSize:'8', color:'#ffffff',backgroundColor:"#4a0b4d"}}>EDI #53684</Text> */}
            <Text
              style={{
                position: 'absolute',
                top: '30px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              To find a provider visit FindProvider.UniversalHealthFellowship.org
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '43px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '298px',
                textAlign: 'left'
              }}
            >
              Providers, send needs requests to: 4555 Mansell Road, Suite 300 Alpharetta, GA 30022
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '65px',
                left: '54px',
                fontSize: '7',
                color: '#000000',
                width: '188px',
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              All medical services for the Healthy Life EasyShare Program 25 are limited to an annual maximum of $25,000 per member.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '100px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services rendered is
              permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or ambulatory surgical center
              services/expenses is determined at a percentage of the facility’s Medicare allowable amounts (140% for Inpatient and 155% for
              Outpatient Services), or, absent an applicable CMS fee schedule, in accordance with current published UHF Sharing Guidelines.
              See applicable Sharing Guidelines for details.
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '140px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              See applicable Sharing Guidelines for details. Universal Health Fellowship (UHF). is a not-for-profit ministry that
              facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does
              not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a discount card or
              program.
            </Text>

            <Text style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '5.5', color: '#000000' }}>{cardId}</Text>
          </>
        ) : null}

        {network == 'smartshare50' ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '22px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Customer Service call: {contactNumber}
            </Text>
            {/* <Text style={{position: "absolute", top:"24px", right:"14px", fontSize:'8', color:'#ffffff',backgroundColor:"#4a0b4d"}}>EDI #53684</Text> */}
            <Text
              style={{
                position: 'absolute',
                top: '30px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              To find a provider visit FindProvider.UniversalHealthFellowship.org
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '43px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '298px',
                textAlign: 'left'
              }}
            >
              Providers, send needs requests to: 4555 Mansell Road, Suite 300 Alpharetta, GA 30022
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '65px',
                left: '54px',
                fontSize: '7',
                color: '#000000',
                width: '188px',
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              All medical services for the Healthy Life EasyShare Program 50 are limited to an annual maximum of $50,000 per member.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '100px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services rendered is
              permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or ambulatory surgical center
              services/expenses is determined at a percentage of the facility’s Medicare allowable amounts (140% for Inpatient and 155% for
              Outpatient Services), or, absent an applicable CMS fee schedule, in accordance with current published UHF Sharing Guidelines.
              See applicable Sharing Guidelines for details.
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '140px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              See applicable Sharing Guidelines for details. Universal Health Fellowship (UHF). is a not-for-profit ministry that
              facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does
              not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a discount card or
              program.
            </Text>

            <Text style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '5.5', color: '#000000' }}>{cardId}</Text>
          </>
        ) : null}

        {network == 'Smartshare' ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '22px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Customer Service call:{contactNumber}
            </Text>
            <Text style={{ position: 'absolute', top: '24px', right: '14px', fontSize: '8', color: '#ffffff', backgroundColor: '#4a0b4d' }}>
              EDI #53684
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '32px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              To find a provider visit FindProvider.UniversalHealthFellowship.org
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '40px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '298px',
                textAlign: 'left'
              }}
            >
              Providers, send needs requests to: P.O. Box 211223, Eagan, MN 55121
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '65px',
                left: '54px',
                fontSize: '7',
                color: '#000000',
                width: '188px',
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              All medical services for the UHS SmartShare Program are limited to an annual maximum of $27,500 per member.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '100px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Member assignment to Providers of eligible medical expense sharing reimbursement as consideration for services rendered is
              permitted by Universal Health Fellowship (UHF). Sharing reimbursement for eligible hospital or ambulatory surgical center
              services/expenses is determined at a percentage of the facility’s Medicare allowable amounts (140% for Inpatient and 155% for
              Outpatient Services), or, absent an applicable CMS fee schedule, in accordance with current published UHF Sharing Guidelines.
              See applicable Sharing Guidelines for details.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '140px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              See applicable Sharing Guidelines for details. Universal Health Fellowship (UHF). is a not-for-profit ministry that
              facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare is not insurance and does
              not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is not a discount card or
              program.
            </Text>
            <Text style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '5.5', color: '#000000' }}>{cardId}</Text>
          </>
        ) : null}
        {network == 'AFMC' ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Preventive Services Appointments visit PreventiveServices.UniversalHealthFellowship.org
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: '22px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              For Customer Service call:{contactNumber}
            </Text>
            <Text style={{ position: 'absolute', top: '24px', right: '14px', fontSize: '8', color: '#ffffff', backgroundColor: '#4a0b4d' }}>
              AFMC EDI #86062
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '30px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '290px',
                textAlign: 'left'
              }}
            >
              To find a provider visit FindProvider.UniversalHealthFellowship.org
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '43px',
                left: '14px',
                fontSize: '7',
                color: '#543379',
                width: '298px',
                textAlign: 'left'
              }}
            >
              Providers, send needs requests to: Arizona Foundation, P.O Box 2909, Phoenix, AZ 86062-2909
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '55px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Pre-notification is required before these procedures will be eligible for sharing: All Inpatient Hospital Confinements, All
              Surgical Procedures (Inpatient, Outpatient and Ambulatory, Organ and Tissue Transplant Services) Cancer Treatment and Oncology
              Services, Independent Lab Tests and Imaging, Home Health Care Services, Carpal Tunnel Treatments. In addition,
              Pre-certification to confirm medical necessity is required before these procedures may be eligible for sharing: Transplant of
              any organ or tissue, a coronary bypass or graft of any kind, or a knee or hip replacement.For Medical Emergencies Seek
              Immediate Medical Help.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '100px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              Participating member assignment of eligible medical expense sharing payment is permitted as consideration in full for services
              rendered. Reimbursement for hospital facility services is determined at a percentage of the facility’s Medicare allowable
              amounts (140% for Inpatient and 155% for Outpatient Services), or, in the absence of an applicable CMS fee schedule, in
              accordance with published UHF Sharing Guidelines. Acceptance of sharing payment for Eligible Expenses constitutes waiver of
              facility/provider right to balance bill patient.
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: '140px',
                left: '14px',
                fontSize: '6',
                color: '#000000',
                width: '298px',
                textAlign: 'justify'
              }}
            >
              See applicable Sharing Guidelines for more details. Universal Health Fellowship (www.UniversalHealthFellowship.org) is a
              not-for-profit ministry that facilitates medical expense sharing through Universal HealthShare Programs. Universal HealthShare
              is not insurance and does not guarantee that eligible medical bills will be shared or otherwise paid. Universal HealthShare is
              not a discount card or program.
            </Text>
            <Text style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '5.5', color: '#000000' }}>{cardId}</Text>
          </>
        ) : null}
        <Text style={{ position: 'absolute', bottom: '14px', left: '14px', fontSize: '5.5', color: '#000000' }}>
          www.UniversalHealthFellowship.org
        </Text>
        {/* <Text style={{position: "absolute",padding:"20",fontSize: '8',top:'280px',fontStyle:'normal',color:'#000000'}}> */}

        {network == 'Smartshare' || network == 'smartshare25' || network == 'smartshare50' ? (
          <>
            <Image
              source={Thanku}
              style={{
                position: 'absolute',
                minWidth: '134px',

                display: 'block',
                height: 'auto',
                width: '100px',
                top: '180px',
                left: '80px'
              }}
            ></Image>
            <Image
              source={Sharing}
              style={{
                position: 'absolute',

                display: 'block',
                height: 'auto',
                width: '80px',
                top: '165px',
                left: '210px'
              }}
            ></Image>
          </>
        ) : (
          <>
            <Image
              source={Thanku}
              style={{
                position: 'absolute',
                minWidth: '54px',

                display: 'block',
                height: 'auto',
                width: '90px',
                top: '230px',
                left: '110px'
              }}
            ></Image>
            <Image
              source={Sharing}
              style={{
                position: 'absolute',

                display: 'block',
                height: 'auto',
                width: '50px',
                top: '220px',
                left: '190px'
              }}
            ></Image>
          </>
        )}
      </View>
    </Page>
  </Document>
)

// const openPDF = (url,blob,username) => {

//     const doc = new jsPDF();
//     let windowReference = window.open();
//     let fileName=username+"_Healthcard.pdf"

//      blob = new Blob([blob],{ type: 'application/octet-stream' });
// //  url = window.URL.createObjectURL(blob);

// //  var link = document.createElement('a');
// //   link.href = url;
// //   link.download=username+"_Healthcard.pdf";
// //   link.click();

// saveAs(url, fileName);
// windowReference.location=url;
// windowReference.focus()
// windowReference.close()
// windowReference.location.href="/DigitalHealthCardNew";
//      // window.location.reload()

// };

class DownloadPDFCard extends Component {
  constructor() {
    super()
    this.state = {
      clickToDownload: false,
      network: null,
      channel: null,
      planIds: null,
      contactNumber: null,
      cardId: null,
      showEmpId: false,
      digitalheathcard: null,
      prefix: '',
      planinfo: null,
      groupno: '',
      membersince: '',
      fname: null,
      lname: null,
      fullName: null,
      surgerytext: ''
    }
    console.log('=================Props is for downlaod pdf=====================', this.props)
  }
  componentDidMount() {
    gethealthcard().then(res => {
      console.log('SERVER RESPONSE Health Card MOBILE=', res.data.memberIdCardList)
      if (res.data.memberIdCardList != null) {
        this.setState(
          {
            digitalheathcard: res.data,
            fname: res.data.memberIdCardList[0].firstName,
            lname: res.data.memberIdCardList[0].lastName,
            plainId: res.data.memberIdCardList[0].planId,
            planinfo: res.data.memberIdCardList[0].planInfo
          },
          () => this.planInfoData()
        )
        this.sethealthcarddata()
        this.getNetworkData(res.data.memberIdCardList[0].planId)
      } else {
        // alert('Data not available.')
        this.setState({ datanotavalabel: true, loader: false })
      }
    })
  }

  getNetworkData(plainid) {
    getNetworkName(plainid).then(res => {
      localStorage.setItem('NETWORK_NAME', res.data.provider_network)
      this.setState({ network: res.data.provider_network })

      this.setState({
        // showHealthCard: true,
        // visible: true,
        loader: false
      })
    })
  }

  planInfoData = () => {
    this.dateformat()
    let fullname = this.state.fname + this.state.lname

    this.setState({ fullName: fullname })

    this.state.planinfo.map((data, index) => {
      if (data.idcardField == 'prefix') {
        this.setState({ prefix: data.fieldValue })
      }
      if (data.idcardField == 'group') {
        this.setState({ groupno: data.fieldValue })
      }
      if (data.idcardField == 'contact number') {
        this.setState({ contactNumber: data.fieldValue })
      }
      if (data.idcardField == 'card id') {
        this.setState({ cardId: data.fieldValue })
      }

      if (data.idcardField == 'Surgery') {
        var res = data.fieldValue.replace('<div>', '')
        var res1 = res.replaceAll('<div>', '')

        var res2 = res1.replaceAll('</div>', '')

        this.setState({ surgerytext: res2 })
      }
    })
  }
  dateformat() {
    var day = moment(this.state.digitalheathcard.memberIdCardList[0].enrollmentDate).format('DD')
    var mon = moment(this.state.digitalheathcard.memberIdCardList[0].enrollmentDate).format('MM')
    var year = moment(this.state.digitalheathcard.memberIdCardList[0].enrollmentDate).format('YYYY')
    var date = mon + '/' + day + '/' + year
    this.setState({ membersince: date })
  }
  sethealthcarddata() {
    if (
      this.state.plainId == '1001' ||
      this.state.plainId == '1002' ||
      this.state.plainId == '1003' ||
      this.state.plainId == '1004' ||
      this.state.plainId == '1005' ||
      this.state.plainId == '1006' ||
      this.state.plainId == '1017' ||
      this.state.plainId == '1018' ||
      this.state.plainId == '1019' ||
      this.state.plainId == '1020' ||
      this.state.plainId == '1021' ||
      this.state.plainId == '1022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'NEO',
        // contactNumber: '(888) 366-6243',
        // // cardId: '1kNEOUHSR071820E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: false
      })
    }

    if (
      this.state.plainId == '7001' ||
      this.state.plainId == '7002' ||
      this.state.plainId == '7003' ||
      this.state.plainId == '7004' ||
      this.state.plainId == '7005' ||
      this.state.plainId == '7006' ||
      this.state.plainId == '7017' ||
      this.state.plainId == '7018' ||
      this.state.plainId == '7019' ||
      this.state.plainId == '7020' ||
      this.state.plainId == '7021' ||
      this.state.plainId == '7022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'Tutela',
        // contactNumber: '(800) 987-1990',
        // // cardId: '7kTTUHSR071720E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '8001' ||
      this.state.plainId == '8002' ||
      this.state.plainId == '8003' ||
      this.state.plainId == '8004' ||
      this.state.plainId == '8005' ||
      this.state.plainId == '8006' ||
      this.state.plainId == '8017' ||
      this.state.plainId == '8018' ||
      this.state.plainId == '8019' ||
      this.state.plainId == '8020' ||
      this.state.plainId == '8021' ||
      this.state.plainId == '8022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'HST',
        // contactNumber: '(888) 942-4725',
        // // cardId: '8kHSTUHSR071720E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '9001' ||
      this.state.plainId == '9002' ||
      this.state.plainId == '9003' ||
      this.state.plainId == '9004' ||
      this.state.plainId == '9005' ||
      this.state.plainId == '9006' ||
      this.state.plainId == '9017' ||
      this.state.plainId == '9018' ||
      this.state.plainId == '9019' ||
      this.state.plainId == '9020' ||
      this.state.plainId == '9021' ||
      this.state.plainId == '9022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'Parish',
        // contactNumber: '(855) 030-4941',
        // // cardId: '9kPBUHSR071720E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '10001' ||
      this.state.plainId == '10002' ||
      this.state.plainId == '10003' ||
      this.state.plainId == '10004' ||
      this.state.plainId == '10005' ||
      this.state.plainId == '10006' ||
      this.state.plainId == '10017' ||
      this.state.plainId == '10018' ||
      this.state.plainId == '10019' ||
      this.state.plainId == '10020' ||
      this.state.plainId == '10021' ||
      this.state.plainId == '10022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'CHS',
        // planIds: [10001, 10002, 10003, 10004, 10005, 10006],
        // contactNumber: '(888) 792-4722',
        // // cardId: '9kPBUHSR071720E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '11001' ||
      this.state.plainId == '11002' ||
      this.state.plainId == '11003' ||
      this.state.plainId == '11004' ||
      this.state.plainId == '11005' ||
      this.state.plainId == '11006' ||
      this.state.plainId == '11017' ||
      this.state.plainId == '11018' ||
      this.state.plainId == '11019' ||
      this.state.plainId == '11020' ||
      this.state.plainId == '11021' ||
      this.state.plainId == '11022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'CHS-Plus',
        // contactNumber: '(888) 792-4722',
        // // cardId: '9kPBUHSR071720E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '12001' ||
      this.state.plainId == '12002' ||
      this.state.plainId == '12003' ||
      this.state.plainId == '12004' ||
      this.state.plainId == '12005' ||
      this.state.plainId == '12006' ||
      this.state.plainId == '12017' ||
      this.state.plainId == '12018' ||
      this.state.plainId == '12019' ||
      this.state.plainId == '12020' ||
      this.state.plainId == '12021' ||
      this.state.plainId == '12022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'BIG',
        // contactNumber: '(855) 809-0110',
        // // cardId: '12kBGUHS071720E072020',
        // cardId: 'UHSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '6001' ||
      this.state.plainId == '6002' ||
      this.state.plainId == '6003' ||
      this.state.plainId == '6004' ||
      this.state.plainId == '6005' ||
      this.state.plainId == '6006' ||
      this.state.plainId == '6017' ||
      this.state.plainId == '6018' ||
      this.state.plainId == '6019' ||
      this.state.plainId == '6020' ||
      this.state.plainId == '6021' ||
      this.state.plainId == '6022'
    ) {
      this.setState({
        // network: 'AFMC',
        // channel: 'AFA',
        // contactNumber: '(855) 229-0257',
        // // cardId: '6kAFAUHSR071820E072020',
        // cardId: '6kAFAUHSR072020E072020',
        showEmpId: true
      })
    }

    if (this.state.plainId == '1011') {
      this.setState({
        // network: 'Smartshare',
        // channel: 'NEO',
        // contactNumber: '(888) 366-6243',
        // cardId: 'SSR101920E101220',
        showEmpId: false //not sure for other than 1011 plans
      })
    }

    if (
      this.state.plainId == '7011' ||
      this.state.plainId == '8011' ||
      this.state.plainId == '12011' ||
      this.state.plainId == '9011' ||
      this.state.plainId == '10011' ||
      this.state.plainId == '11011' ||
      this.state.plainId == '13011'
    ) {
      this.setState({
        // network: 'Smartshare',
        // channel: 'PHCS',
        // contactNumber: '(855) 809-0110',
        // cardId: 'UHSR101920E101220',
        showEmpId: true //not sure for other than 1011 plans
      })
    }

    if (this.state.plainId == '6011') {
      this.setState({
        // network: 'Smartshare',
        // channel: 'UHF',
        // contactNumber: '(888) 791-4722',
        // cardId: 'SSR101920E101220',
        showEmpId: true
      })
    }

    if (
      this.state.plainId == '13001' ||
      this.state.plainId == '13002' ||
      this.state.plainId == '13003' ||
      this.state.plainId == '13004' ||
      this.state.plainId == '13005' ||
      this.state.plainId == '13006' ||
      this.state.plainId == '13017' ||
      this.state.plainId == '13018' ||
      this.state.plainId == '13019' ||
      this.state.plainId == '13020' ||
      this.state.plainId == '13021' ||
      this.state.plainId == '13022'
    ) {
      this.setState({
        // network: 'PHCS',
        // channel: 'Aspire',
        // contactNumber: '(888) 992-4789',
        // cardId: '13kAPUHSR092920E082420',
        showEmpId: true
      })
    }
    if (
      this.state.plainId == '20120' ||
      this.state.plainId == '20140' ||
      this.state.plainId == '20160' ||
      this.state.plainId == '20151' ||
      this.state.plainId == '20152' ||
      this.state.plainId == '20220' ||
      this.state.plainId == '20240' ||
      this.state.plainId == '20260' ||
      this.state.plainId == '20251' ||
      this.state.plainId == '20252' ||
      this.state.plainId == '20320' ||
      this.state.plainId == '20340' ||
      this.state.plainId == '20360' ||
      this.state.plainId == '20351' ||
      this.state.plainId == '20352' ||
      this.state.plainId == '20420' ||
      this.state.plainId == '20440' ||
      this.state.plainId == '20460' ||
      this.state.plainId == '20451' ||
      this.state.plainId == '20452' ||
      this.state.plainId == '20520' ||
      this.state.plainId == '20540' ||
      this.state.plainId == '20560' ||
      this.state.plainId == '20551' ||
      this.state.plainId == '20552'
    ) {
      this.setState({
        showEmpId: true
      })
    }

    this.setState({ loader: false })
  }

  downloadCard = async event => {
    console.log('========Namita==========', event)
    let filename = this.state.fullName + '_membercard.pdf'

    this.setState({ clickToDownload: true })
    event.preventDefault() // prevent page reload
    const blob = await pdf(
      <PrintDoc
        data={this.state.digitalheathcard}
        cardId={this.state.cardId}
        network={this.state.network}
        contactNumber={this.state.contactNumber}
        showEmpId={this.state.showEmpId}
        planinfo={this.state.planinfo}
        prefix={this.state.prefix}
        membersince={this.state.membersince}
        groupno={this.state.groupno}
        surgeryText={this.state.surgerytext}
      />
    ).toBlob()
    var blob1 = new Blob([blob], { type: 'application/octet-stream' })
    saveAs(blob, filename)
  }

  render() {
    return (
      <div>
        <div id="pdf"></div>

        <button class="download_button_class" onClick={this.downloadCard}>
          <GetAppIcon style={{ color: '#41b5c2' }} />
          DOWNLOAD
        </button>
        {/* </div> */}
        {/* {this.state.clickToDownload ?
           <PDFDownloadLink document={<PrintDoc data={this.state.digitalheathcard} cardId={this.state.cardId} network={this.state.network}
           contactNumber={this.state.contactNumber} showEmpId={this.state.showEmpId} planinfo={this.state.planinfo} prefix={this.state.prefix} membersince={this.state.membersince} groupno={this.state.groupno} surgeryText={this.state.surgerytext}/>} fileName="Healthcard.pdf">
           {({ blob, url, loading, error }) =>
               loading ? '' : openPDF(url,blob,this.state.fullName)
           }
            </PDFDownloadLink>
          :null
        } */}
      </div>
    )
  }
}
export default DownloadPDFCard
