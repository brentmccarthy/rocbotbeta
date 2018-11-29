var possibles = new Array;
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '123456', 'name' : 'ABC Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-11 Electrical', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890|4777777', 'bondEffective' : '12/04/2010|12/05/2008', 'bondCancelled' : '|12/04/2010', 'bondAmount' : '5000|4000', 'bondPaid' : '0|0', 'bondAvailable': '5000|0', 'bondCompany' : 'Bond Company Inc|Bills Bonds', 'bondNotes' : 'This is where bond notes would go.|These are notes for the second bond.', 'serviceArea' : 'Phoenix, Tempe, Chandler, Mesa', 'serviceType': 'new, remodel, repair', 'hours': 'start:0600, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '123457', 'name' : 'ABC Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Phoenix, Tempe, Chandler, Mesa', 'serviceType': 'new, remodel, repair', 'hours': 'start:0600, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '123458', 'name' : 'ABC Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Phoenix, Tempe, Chandler, Mesa', 'serviceType': 'new, remodel, repair', 'hours': 'start:0600, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '123546', 'name' : 'CBA Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Suspended', 'class' : 'C-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'C-11 Electrical', 'comments' : 'This is where comments would go.', 'qp' : 'Jeff Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Phoenix', 'serviceType': 'new, remodel, repair', 'hours': 'start:0900, end:1500, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '123654', 'name' : 'BCAC Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Cancelled', 'class' : 'R-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-11 Electrical', 'comments' : 'This is where comments would go.', 'qp' : 'Jim Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : '', 'serviceType': 'new, remodel, repair', 'hours': 'start:1000, end:1500, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '124456', 'name' : 'EABC Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-10', 'type' : 'Commercial/Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : '', 'serviceType': 'repair', 'hours': 'start:0800, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '124546', 'name' : 'ECBA Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Suspended', 'class' : 'C-10', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'C-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'Jeff Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Phoenix', 'serviceType': 'remodel, repair', 'hours': 'start:0800, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '124654', 'name' : 'EBCAC Company', 'address' : 'PO Box 1234', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Cancelled', 'class' : 'R-10', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'Jim Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Phoenix', 'serviceType': 'remodel, repair', 'hours': 'start:0800, end:1500, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '125456', 'name' : 'NABC Company', 'address' : 'PO Box 1234', 'city' : 'Payson', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-16', 'type' : 'Commercial/Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Payson, Star Valley', 'serviceType': 'new, remodel, repair', 'hours': 'start:0600, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '125546', 'name' : 'NCBA Company', 'address' : 'PO Box 1234', 'city' : 'Prescott', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Suspended', 'class' : 'C-16', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'C-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'Jeff Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Prescott, Prescott Valley, Iron Springs', 'serviceType': 'remodel, repair', 'hours': 'start:0000, end:2359, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '125654', 'name' : 'NBCAC Company', 'address' : 'PO Box 1234', 'city' : 'Flagstaff', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Cancelled', 'class' : 'R-16', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'Jim Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Flagstaff, Bellmont, Winona, Mountainaire', 'serviceType': 'new, repair', 'hours': 'start:0600, end:1800, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '223456', 'name' : 'ABC2 Company', 'address' : 'PO Box 1234', 'city' : 'Mesa', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-11 Electrical', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Mesa, Tempe, Ahwatukee, Phoenix', 'serviceType': 'remodel, repair', 'hours': 'start:0600, end:1800, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '223546', 'name' : 'CBA2 Company', 'address' : 'PO Box 1234', 'city' : 'Mesa', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Suspended', 'class' : 'C-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'C-11 Electrical', 'comments' : 'This is where comments would go.', 'qp' : 'Jeff Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Mesa, Tempe, Gilbert, Chandler', 'serviceType': 'new, remodel, repair', 'hours': 'start:0800, end:1700, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '223654', 'name' : 'BCAC2 Company', 'address' : 'PO Box 1234', 'city' : 'Tempe', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Cancelled', 'class' : 'R-11', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-11 Electrical', 'comments' : 'This is where comments would go.', 'qp' : 'Jim Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tempe, Chandler', 'serviceType': 'new, remodel, repair', 'hours': 'start:0800, end:1700, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '224456', 'name' : 'EABC2 Company', 'address' : 'PO Box 1234', 'city' : 'Gilbert', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-10', 'type' : 'Commercial/Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Gilbert, Chandler, Tempe, Mesa', 'serviceType': 'remodel, repair', 'hours': 'start:0500, end:1900, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '224546', 'name' : 'ECBA2 Company', 'address' : 'PO Box 1234', 'city' : 'Snowflake', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Suspended', 'class' : 'C-10', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'C-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'Jeff Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Snowflake, Show Low, Pinetop', 'serviceType': 'new, repair', 'hours': 'start:0800, end:1500, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '224654', 'name' : 'EBCAC2 Company', 'address' : 'PO Box 1234', 'city' : 'Glendale', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Cancelled', 'class' : 'R-10', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-10 Drywall', 'comments' : 'This is where comments would go.', 'qp' : 'Jim Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Glendale, Phoenix, Surprise, Peoria', 'serviceType': 'new', 'hours': 'start:0800, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '225456', 'name' : 'NABC2 Company', 'address' : 'PO Box 1234', 'city' : 'Chandler', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-16', 'type' : 'Commercial/Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'CR-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'John Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Chandler, Tempe, Gilbert, Mesa', 'serviceType': 'new, remodel', 'hours': 'start:0900, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '225546', 'name' : 'NCBA2 Company', 'address' : 'PO Box 1234', 'city' : 'Avondale', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Suspended', 'class' : 'C-16', 'type' : 'Commercial', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2022', 'licenseClass' : 'C-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'Jeff Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Avondale, Goodyear, Litchfield Park, Liberty, Maryvale, Buckeye', 'serviceType': 'new, remodel', 'hours': 'start:0830, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '225654', 'name' : 'NBCAC2 Company', 'address' : 'PO Box 1234', 'city' : 'Tucson', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Cancelled', 'class' : 'R-16', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'Jim Doe', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tucson', 'serviceType': 'remodel, repair', 'hours': 'start:1115, end:1500, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '225655', 'name' : 'Walter Morris', 'address' : 'PO Box 12345', 'city' : 'Tucson', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'R-16', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'Walter Morris', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tucson', 'serviceType': 'new, repair', 'hours': 'start:845, end:1500, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '345782', 'name' : 'David Davison', 'address' : 'PO Box 12345', 'city' : 'Tucson', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'R-16', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'David Davison', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tucson', 'serviceType': 'new', 'hours': 'start:0600, end:1645, Weekdays, Weekends', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '545562', 'name' : 'Kurt Suzuki', 'address' : 'PO Box 12345', 'city' : 'Tucson', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'R-16', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-16 Fire Protection Systems', 'comments' : 'This is where comments would go.', 'qp' : 'Kurt Suzuki', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tucson', 'serviceType': 'remodel, repair', 'hours': 'start:0600, end:1700, Weekdays', 'website': 'http://www.ourwebsite.com' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '345788', 'name' : 'Petes Plumbing', 'address' : 'PO Box 12345', 'city' : 'Phoenix', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'CR-37', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'CR-37 Plumber', 'comments' : 'This is where comments would go.', 'qp' : 'Pete Pesky', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tucson', 'serviceType': 'new', 'hours': 'start:0600, end:1645, Weekdays, Weekends', 'website': 'http://www.twitter.com/ourpage' };
possibles[possibles.length] = { 'stype' : 'company', 'licenseno': '545568', 'name' : 'Leakmasters', 'address' : 'PO Box 12345', 'city' : 'Tucson', 'state' : 'AZ', 'zip' : '85066-8706', 'primaryphone' : '602-555-1234', 'status': 'Current', 'class' : 'R-37', 'type' : 'Residential', 'entity' : 'LLC', 'firstIssued' : '12/04/2010', 'renewedThru' : '12/31/2011', 'licenseClass' : 'R-37 Plumber', 'comments' : 'This is where comments would go.', 'qp' : 'Larry Tootall', 'qpposition' : 'QP/Member', 'qualDate' : '12/04/2010', 'otherParties' : 'Jane Doe|Member||Jimmy Smith|Member', 'complaintsOpen': '0', 'complaintsDisciplined': '0', 'complaintsResolved': '0', 'complaintsDenied': '0', 'complaintsBankruptcy': '0', 'bondNumber' : '4567890', 'bondEffective' : '12/04/2010', 'bondCancelled' : '12/04/2011', 'bondAmount' : '5000', 'bondPaid' : '0', 'bondAvailable': '5000', 'bondCompany' : 'Bond Company Inc', 'bondNotes' : 'This is where bond notes would go.', 'serviceArea' : 'Tucson', 'serviceType': 'remodel, repair', 'hours': 'start:0600, end:1700, Weekdays', 'website': 'http://www.facebook.com/ourpage' };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'Jeff Doe', 'title': 'Qualifying Party', 'company' : 'NCBA2 Company', 'licenses': '123546,124546'  };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'Walter Morris', 'title': 'Qualifying Party', 'company' : 'Sole Proprietor', 'licenses': '225655'  };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'John Doe', 'title': 'Qualifying Party', 'company' : 'ABC Company', 'licenses': '123456,123457,123458'  };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'Jane Doe', 'title': 'Member', 'company' : 'ABC Company', 'licenses': '123456,123457,123458'  };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'Jim Doe', 'title': 'Qualifying Party', 'company' : 'Sole Proprietor', 'licenses': '123654'  };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'David Davison', 'title': 'Qualifying Party', 'company' : 'Sole Proprietor', 'licenses': '345782'  };
possibles[possibles.length] = { 'stype' : 'person', 'name' : 'Kurt Suzuki', 'title': 'Qualifying Party', 'company' : 'Sole Proprietor', 'licenses': '545562'  };

var searchTerms = [];  
searchTerms[searchTerms.length] = ["Plumber","plumber, plumbing, pipes, water, leak, fix leak, fix"];
searchTerms[searchTerms.length] = ["Electrical","electrical, electrician, electricity, wall sockets, control panel, wiring, wires, sparks"];
searchTerms[searchTerms.length] = ["Dryall","drywall, sheet rock, sheetrock, plaster, walls"];
searchTerms[searchTerms.length] = ["Fire Protection","|sprinklers|fire extinguishers|fire suppression|fire protection|fire alarms|fire protection systems|"]; 
searchTerms[searchTerms.length] = ["CR-11 Electrical","|electrical|electrician|electricity|wall sockets|control panel|commercial|residential|dual|cr|cr-11 electrical|"];
searchTerms[searchTerms.length] = ["CR-10 Drywall","|drywall|sheet rock|sheetrock|plaster|walls|commercial|residential|dual|cr|cr-10 drywall|"];
searchTerms[searchTerms.length] = ["CR-16 Fire Protection Systems","|sprinklers|fire extinguishers|fire suppression|fire protection|fire alarms|commercial|residential|dual|cr|cr-16 fire protection systems|"]; 
searchTerms[searchTerms.length] = ["R-11 Electrical","|electrical|electrician|electricity|wall sockets|control panel|residential|r|r-11 electrical|"];
searchTerms[searchTerms.length] = ["R-10 Drywall","|drywall|sheet rock|sheetrock|plaster|walls|residential|r|r-10 drywall|"];
searchTerms[searchTerms.length] = ["R-16 Fire Protection Systems","|sprinklers|fire extinguishers|fire suppression|fire protection|fire alarms|residential|r|r-16 fire protection systems|"]; 
searchTerms[searchTerms.length] = ["C-11 Electrical","|electrical|electrician|electricity|wall sockets|control panel|commercial|c|c-11 electrical|"];
searchTerms[searchTerms.length] = ["C-10 Drywall","|drywall|sheet rock|sheetrock|plaster|walls|commercial|c|c-10 drywall|"];
searchTerms[searchTerms.length] = ["C-16 Fire Protection Systems","|sprinklers|fire extinguishers|fire suppression|fire protection|fire alarms|commercial|c|c-16 fire protection systems|"];    
searchTerms[searchTerms.length] = ["CR-37 Plumber","plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["R-37 Plumber","plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["B-3 General Remodeling and Repair","general, remodel, remodeling, repair, fix, solve, electric, electrical, drywall, walls, plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["B-4 General Residential Engineering","general, engineer, engineering, residential, home, electric, electrical, drywall, walls, plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["R-62 Minor Home Improvements","minor, home, improvement, improve, small, job, jobs, electric, electrical, drywall, walls, plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["CR-21 Landscaper","landscape, landscaping, exterior, plants, trees, tree, plant, plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["R-21 Landscaper","landscape, landscaping, exterior, plants, trees, tree, plant, plumber, plumbing, pipes, water, leak"];
searchTerms[searchTerms.length] = ["Phoenix","phoenix"];
searchTerms[searchTerms.length] = ["Mesa","mesa"];
searchTerms[searchTerms.length] = ["Tucson","tucson"];
searchTerms[searchTerms.length] = ["Payson","payson"];
searchTerms[searchTerms.length] = ["Prescott","prescott"];
searchTerms[searchTerms.length] = ["Flagstaff","flagstaff"];
searchTerms[searchTerms.length] = ["Gilbert","gilbert"];
searchTerms[searchTerms.length] = ["Chandler","chandler"];
searchTerms[searchTerms.length] = ["Avondale","avondale"];
searchTerms[searchTerms.length] = ["Glendale","glendale"];
searchTerms[searchTerms.length] = ["Tempe","tempe"];
searchTerms[searchTerms.length] = ["Snowflake","snowflake"];
searchTerms[searchTerms.length] = ["Residential","residential"];
searchTerms[searchTerms.length] = ["Commercial","commercial"];
searchTerms[searchTerms.length] = ["Pinetop","pinetop"];
searchTerms[searchTerms.length] = ["Heber","Heber"];
searchTerms[searchTerms.length] = ["Show Low","show low"];
searchTerms[searchTerms.length] = ["Star Valley","star valley"];
searchTerms[searchTerms.length] = ["Iron Springs","iron springs"];
searchTerms[searchTerms.length] = ["Prescott Valley","prescott valley"];
searchTerms[searchTerms.length] = ["Bellmont","bellmont"];
searchTerms[searchTerms.length] = ["Winona","winona"];
searchTerms[searchTerms.length] = ["Ahwatukee","ahwatukee"];
searchTerms[searchTerms.length] = ["Mountainaire","mountainaire"];
searchTerms[searchTerms.length] = ["Surprise","surprise"];
searchTerms[searchTerms.length] = ["Peoria","peoria"];
searchTerms[searchTerms.length] = ["Goodyear","goodyear"];
searchTerms[searchTerms.length] = ["Litchfield Park","litchfield park,lichfield,litch"];
searchTerms[searchTerms.length] = ["Liberty","liberty"];
searchTerms[searchTerms.length] = ["Maryvale","maryvale,mary vale,mary,vale"];
searchTerms[searchTerms.length] = ["Buckeye","buckeye,buck eye,buck,eye"];
searchTerms[searchTerms.length] = ["Tombstone","tombstone,tomb stone"];
searchTerms[searchTerms.length] = ["New Construction","new, new construction, new build, new buildings, development, new developments"];
searchTerms[searchTerms.length] = ["Remodel","remodel, remodels, refurbish, re-furbish, retrofit, retro-fit, re-construction, reconstruction, refresh, do over, do-over, doover, renovation, renovations"];
searchTerms[searchTerms.length] = ["Repair","repair, replace, retrofit, fix, broken, broke, break, brake, ruined, ruin, re pair, repare"];
searchTerms[searchTerms.length] = ["Weekday Service","weekday, weekdays, monday, tuesday, wednesday, thursday, friday"];
searchTerms[searchTerms.length] = ["Weekend Service","weekend, weekends, saturday, sunday"];
searchTerms[searchTerms.length] = ["Holiday Service","holiday, holidays, christmas, new year's, new years, new year's eve, new years eve, easter, thanksgiving, turkey day, presidents day, president's day, veterans day, veteran's day, memorial day, 4th of july, fourth of july, july 4th, july fourth, july forth, forth of july"];
searchTerms[searchTerms.length] = ["Emergency Service","emergency, imergency, immergency, emmergency, after hours, after-hours, service, emergency service, after hours service, after-hours service, 24 hour, 24 hr"];
searchTerms[searchTerms.length] = ["All Statuses","all statuses, all, current, active, good standing, cancelled, canceled, suspended, non-renewal, expired, cancellation, revoked, inactive, frozen, pending, denied, withdrawn"];
searchTerms[searchTerms.length] = ["Cancelled","cancelled, canceled, cancellation, voluntary cancellation"];
searchTerms[searchTerms.length] = ["Current","current, active, good standing"];
searchTerms[searchTerms.length] = ["Inactive","inactive"];
searchTerms[searchTerms.length] = ["Revoked","revoked"];
searchTerms[searchTerms.length] = ["Expired","expired"];
searchTerms[searchTerms.length] = ["Pending","pending, application pending"];
searchTerms[searchTerms.length] = ["Withdrawn","withdrawn"];
searchTerms[searchTerms.length] = ["Frozen","frozen"];
searchTerms[searchTerms.length] = ["Suspended Non-Renewal","suspended, suspended non-renewal, non-renewal"];
searchTerms[searchTerms.length] = ["Voluntary Cancellation","voluntary cancellation"];
searchTerms[searchTerms.length] = ["Denied","denied, deny"];
searchTerms[searchTerms.length] = ["Kitchen","kitchen, oven, refridgerator, refrigerator, sink, kitchen sink, stove, microwave"];
searchTerms[searchTerms.length] = ["Bathroom","bath, bathroom, half, full, shower, tub, sink"];
searchTerms[searchTerms.length] = ["Home Addition","addition, home addition, addition to home, addon, add-on, extension, ecstension, new rooms, new, added"];
searchTerms[searchTerms.length] = ["Exterior","exterior, outside, eccsterior, eccstereor, eccsterior, exsteerior, out side"];
searchTerms[searchTerms.length] = ["Interior","interior, inside, in side, inteerior, inteereeor, intereor"];
searchTerms[searchTerms.length] = ["HVAC","heating, ventilation, venting, vents, heat, hot, air conditioning, air, a/c, ac, a c, cold air, cold, ice, icy, icey, frigid, fridged, fridgid"];
searchTerms[searchTerms.length] = ["Air Conditioning","hvac, ac, a/c, a c, ac, aycee, acey, acee, cold, cold air, ice, icy, icey, frigid, fridged"];
searchTerms[searchTerms.length] = ["Paint","paint, painting, wall covering, walls, covering, exterior paint, interior paint"];
searchTerms[searchTerms.length] = ["Home","home, house, residence, residential, casa, port of call, where i hang my hat"];
searchTerms[searchTerms.length] = ["Floor Coverings","carpet, rug, wall-to-wall, wall to wall, carpeting, rugs, tile, tiles, hard wood, hardwood, hard woods, hardwoods, birch, elm, spruce, bamboo"];
searchTerms[searchTerms.length] = ["Hardwood","hardwood, hard wood, hard woods, hardwoods, spruce, maple, birch, bamboo"];
searchTerms[searchTerms.length] = ["Carpet","carpet, rug, wall-to-wall, wall to wall, carpeting, rugs"];
searchTerms[searchTerms.length] = ["Tile","tile, tiles, ceramic, lynolium, linoleum, linolium"];
searchTerms[searchTerms.length] = ["Installation","installation, install, installing, put in, add, set, place, put down"];
searchTerms[searchTerms.length] = ["Demolition","demo, demolition, extraction, removal, remove, take out, put out, delete, unset, take out"];
searchTerms[searchTerms.length] = ["Emergency","emergency, right away, right now, now, ahora, immediately, immediate, rush, expedite"];

var searchCriteria = "";
var prevSearchCriteria = "";

function contractorSearchCriteria ( v ) {
    if ( prevSearchCriteria != v ) {
        var first = 0;
        var ifFirst = " cSearchSelectTypeOptionSelected";
        if ( document.getElementById('cSearchPossibleCriteria') != null && v.trim() != '' ) {
            document.getElementById('cSearchPossibleCriteria').style.display = 'none';
            document.getElementById('cSearchPossibleCriteria').innerHTML = '';
            var returnHtml = '';
            for ( i = 0; i < searchTerms.length; i++ ) { 
                var expTerm = v.split(' ');
                for ( vv = 0; vv < expTerm.length; vv++ ) {
                    if ( searchTerms[i][1].indexOf(expTerm[vv]) > -1 ) { 
                        if ( first > 0 ) { ifFirst = ""; }
                        if ( returnHtml.indexOf("'" + searchTerms[i][0] + "'") < 0 ) {
                            returnHtml += "<a href=\"javascript:contractorSearchAddCriteria('" + searchTerms[i][0] + "');\"><span class=\"cSearchSelectTypeOptionC" + ifFirst + "\">" + searchTerms[i][0] + "</span></a>";
                            first = 1;
                        } 
                    }
                }
            }
            if ( returnHtml.trim() != '' ) {
                document.getElementById('cSearchPossibleCriteria').style.display = 'block';
                document.getElementById('cSearchPossibleCriteria').innerHTML = returnHtml;
            }
        } else { 
            if ( v.trim() == '' ) {
                if ( document.getElementById('cSearchPossibleCriteria') != null ) {
                    document.getElementById('cSearchPossibleCriteria').style.display = 'none';
                    document.getElementById('cSearchPossibleCriteria').innerHTML = '';
                }
            }
        }
    }
    prevSearchCriteria = v;
}

function contractorSearchAddCriteria ( v ) {
    if ( document.getElementById('cSearchPossibleCriteria') != null && v.trim() != '' ) {
        document.getElementById('cSearchPossibleCriteria').style.display = 'none';
        document.getElementById('cSearchPossibleCriteria').innerHTML = '';
        if ( document.getElementById('cSearchCriteriaV') != null ) { 
            if ( document.getElementById('cSearchCriteriaV').value.trim() == '' ) {
                if ( document.getElementById('cSearchKeywords').value.trim() != '' ) {
                    document.getElementById('cSearchKeywords').value = ''; 
                } 
            } else {
                document.getElementById('cSearchCriteriaV').value = '';
            }
        }
        if ( document.getElementById('cSearchCriteriaV') != null ) { document.getElementById('cSearchCriteriaV').value = ''; }
    }
    if ( document.getElementById('cSearchCriteria') != null ) {
        var returnHtml = document.getElementById('cSearchCriteria').innerHTML;
        returnHtml += "<span class=\"cSearchCriteriaOption\">" + v + "<a href=\"javascript:contractorSearchRemoveCriteria('" + v + "');\">X</a></span>";
        document.getElementById('cSearchCriteria').innerHTML = returnHtml;
        searchCriteria = searchCriteria +  v + "||";
    }
}

function contractorSearchRemoveCriteria ( v ) {
    if ( document.getElementById('cSearchCriteria') != null ) {
        var returnHtml = document.getElementById('cSearchCriteria').innerHTML;
        returnHtml = returnHtml.replace("<span class=\"cSearchCriteriaOption\">" + v + "<a href=\"javascript:contractorSearchRemoveCriteria('" + v + "');\">X</a></span>","");
        document.getElementById('cSearchCriteria').innerHTML = returnHtml.trim();
        searchCriteria = searchCriteria.replace( v + "||", "");
    }
}

function contractorSearchClearCriteria () {
    if ( document.getElementById('cSearchCriteria') != null ) {
        document.getElementById('cSearchCriteria').innerHTML = '';
        searchCriteria = '';
    }
    if ( document.getElementById('cSearchResults') != null ) {
        document.getElementById('cSearchResults').innerHTML = '';
        $('#cSearchResults').hide();
    }
    if ( document.getElementById('licenseInfo') != null ) {
        $('#cSearchReturnToResults').hide();
        $('#cSearchReturnToResultsB').hide();
        $('#licenseInfo').hide();
    }
}

function togglecSearchType () { 
    if ( document.getElementById('cSearchButtonSubMenu') != null ) { 
        if ( document.getElementById('cSearchButtonSubMenu').style.display == 'block' ) {
            document.getElementById('cSearchButtonSubMenu').style.display = 'none';
        } else {
            document.getElementById('cSearchButtonSubMenu').style.display = 'block';
        }
    }
}

function cSearchSelectType ( t ) { 
    if ( document.getElementById('cSearchButtonText') != null && t.trim() != '' ) {
        if ( t == "person" ) {
            document.getElementById('cSearchButtonText').innerHTML = "Person";
            if ( document.getElementById('cSearchType') != null ) { document.getElementById('cSearchType').value = t; }
        } else if ( t == "company" ) {
            document.getElementById('cSearchButtonText').innerHTML = "Company";
            if ( document.getElementById('cSearchType') != null ) { document.getElementById('cSearchType').value = t; }
        } else {
            document.getElementById('cSearchButtonText').innerHTML = "Search All";
            if ( document.getElementById('cSearchType') != null ) { document.getElementById('cSearchType').value = t; }
        }
        togglecSearchType();
    }
}

function displayError ( err ) {
    if ( document.getElementById('cSearchError') != null && err.trim() != '' ) {
        document.getElementById('cSearchError').innerHTML = err;
        document.getElementById('cSearchError').style.display = 'block';
    }
}

function displayMessage ( msg ) {
    if ( document.getElementById('cSearchMsg') != null && msg.trim() != '' ) {
        document.getElementById('cSearchMsg').innerHTML = msg;
        document.getElementById('cSearchMsg').style.display = 'block';
        setTimeout('hideMessage()',12000);
    }
}

function hideMessage () {
    if ( document.getElementById('cSearchMsg') != null ) {
        document.getElementById('cSearchMsg').style.display = 'none';
    }
}

function searchSortFunction ( a, b ) { 
    if ( a[1] === b[1] ) { 
        return 0;
    } else { 
        return (b[1] < a[1]) ? -1 : 1;
    }
}

function searchSortRandom ( a, b ) { 
    return (b[1] < a[1]) ? 0.5 - Math.random() : 0.5 + Math.random();
}

function checkSearchKeyPress (e) {
    var key = e.which || e.keyCode;
    var v = '';
    var suggs = document.getElementsByClassName('cSearchSelectTypeOptionC');
    var prvSuggs = document.getElementsByClassName('cSearchSelectTypeOptionSelected');
    for ( ps = 0; ps < prvSuggs.length; ps++ ) { 
      var rpp = document.getElementsByClassName('cSearchSelectTypeOptionSelected')[ps].className;
      document.getElementsByClassName('cSearchSelectTypeOptionSelected')[ps].className = rpp.replace(' cSearchSelectTypeOptionSelected','');
    }
    if (key === 9 || key === 13) { // 9 is tab, 13 is enter
      if ( document.getElementById('cSearchPossibleCriteria') != null ) {
        if ( suggs[vc] != undefined ) { // 0, 1, 2 are in search button
          v = suggs[vc].innerHTML;
          if ( v.trim() != '' ) {
            contractorSearchAddCriteria(v);
            vc = 0;
          }
        } else { 
          displayError("Sorry but there were no suggested search criteria for that keyword string. Please alter your keywords and try again.");
        }
      } else { 
        displayError("Sorry but there were no suggested search criteria for that keyword string. Please alter your keywords and try again.");
      }
    } else if ( key === 40 || key === 39 || key === 38 || key === 37 ) {
      if ( key === 40 || key === 39 ) {
        vc++;
        if ( vc >= suggs.length ) { vc = 0; }
      } else {
        vc--;
        if ( vc < 0 ) { vc = suggs.length - 1; }
      }
      if ( suggs[vc] != null ) { suggs[vc].className = suggs[vc].className + " cSearchSelectTypeOptionSelected"; }
    } 
}

function contractorSearch () {
    var pause = 0;
    var searchScores = [];
    var typeSearch = "all";
    var returnHtml = '';
    if ( document.getElementById('cSearching') != null ) {
        document.getElementById('cSearching').style.display = 'block';
    }
    if ( document.getElementById('licenseInfo') != null ) {
        $('#licenseInfo').hide();
        $('#cSearchReturnToResults').hide();
        $('#cSearchReturnToResultsB').hide();
    }
    if ( document.getElementById('cSearchResults') != null ) {
        document.getElementById('cSearchResults').innerHTML = '';
    }
    if ( document.getElementById('cSearchButtonSubMenu') != null ) {
        if ( document.getElementById('cSearchButtonSubMenu').style.display == 'block' ) { 
            pause = 1;
        }
    }
    if ( document.getElementById('cSearchError') != null ) {
        document.getElementById('cSearchError').style.display = 'none';
        document.getElementById('cSearchError').innerHTML = '';
    }
    if ( document.getElementById('cSearchKeywords') != null ) {
        var keys = document.getElementById('cSearchKeywords').value;
        if ( keys.toLowerCase().indexOf('www') > -1 || keys.toLowerCase().indexOf('http') > -1 ) { 
            pause = 1;
            displayError("You have searched for an invalid string. Please search with a company or person's name only. If you would like to add other criteria, use the field below.");
        } else if ( keys.trim() != '' && ( keys.length > 2 || searchCriteria.trim() != '' ) ) { 
            contractorSearchAddCriteria(keys);
        } else if ( keys.length < 3 && keys.length > 0 && searchCriteria.trim() == '' ) { 
            pause = 1;
            displayError("Please enter a search string of more than 2 characters.");
        }
    } else { 
        if ( searchCriteria.trim() != '' ) {
            pause = 1;
        }
    }
    if ( document.getElementById('cSearchType') != null ) {
        if ( document.getElementById('cSearchType').value != "all" ) { 
            typeSearch = document.getElementById('cSearchType').value;
            contractorSearchRemoveCriteria('Current');
        } 
        var searchCriteriaL = searchCriteria.toLowerCase().trim();
        var isNumberSearch = 0;
        if ( searchCriteriaL.length <= 8 ) {
            var pi = parseInt(searchCriteriaL.replace("||",""));
            if ( pi > 100 && pi < 1000000 ) { 
                isNumberSearch = 1;
            }
        }
        if ( isNumberSearch == 0 && searchCriteriaL.trim() != '' && ( document.getElementById('cSearchType').value == "all" ) && (searchCriteriaL.indexOf('current') < 0 && searchCriteriaL.indexOf('inactive') < 0 && searchCriteriaL.indexOf('suspend') < 0 && searchCriteriaL.indexOf('all') < 0 && searchCriteriaL.indexOf('cancelled') < 0 && searchCriteriaL.indexOf('expired') < 0 && searchCriteriaL.indexOf('revoked') < 0 && searchCriteriaL.indexOf('frozen') < 0 && searchCriteriaL.indexOf('pending') < 0 && searchCriteriaL.indexOf('denied') < 0 && searchCriteriaL.indexOf('withdrawn') < 0) ) { 
            //contractorSearchAddCriteria('Current');
        }
    }
    if ( pause == 0 ) { 
        if ( searchCriteria != '' ) {
            var searchCriteriaArr = searchCriteria.split("||");
            var somethingFound = 0;
            var criteriaFound = 0;
            for ( f = 0; f < searchCriteriaArr.length; f++ ) { 
                var sc = searchCriteriaArr[f].toLowerCase();
                if ( sc.trim() != '' ) {
                    for ( p = 0; p < possibles.length; p++ ) {
                        if ( searchScores[p] == undefined ) { searchScores[p] = [ p, 0 ]; }
                        if ( possibles[p]['stype'] == "company" && ( typeSearch == "all" || typeSearch == "company" ) ) {
                            if ( possibles[p]['status'] == sc || possibles[p]['licenseno'] == sc || possibles[p]['name'].toLowerCase().indexOf(sc) > -1 || possibles[p]['type'].toLowerCase().indexOf(sc) > -1 || possibles[p]['city'].toLowerCase().indexOf(sc) > -1 || possibles[p]['licenseClass'].toLowerCase().indexOf(sc) > -1 || possibles[p]['type'].toLowerCase().indexOf(sc) > -1 || possibles[p]['qp'].toLowerCase().indexOf(sc) > -1 || possibles[p]['otherParties'].toLowerCase().indexOf(sc) > -1 || possibles[p]['serviceArea'].toLowerCase().indexOf(sc) > -1 || possibles[p]['serviceType'].toLowerCase().indexOf(sc) > -1 || possibles[p]['hours'].toLowerCase().indexOf(sc) > -1 ) {
                                searchScores[p][1] = parseInt(searchScores[p][1]) + 1;
                                somethingFound = 1;
                            } 
                        } else if ( possibles[p]['stype'] == "person" && ( typeSearch == "all" || typeSearch == "person" ) ) { 
                            if ( possibles[p]['name'].toLowerCase().indexOf(sc) > -1 || possibles[p]['company'].toLowerCase().indexOf(sc) > -1 ) {
                                searchScores[p][1] = parseInt(searchScores[p][1]) + 1;
                                somethingFound = 1;
                            } 
                        }
                    }
                    criteriaFound++;
                }
            }
            if ( searchScores.length == 0 || somethingFound == 0 ) { 
                displayError("Sorry but those criteria returned no results. Please change your search terms and try again. If you feel that you've gotten this message in error or if you have concerns with your search, please feel free to contact us at <a href='mailto:webmaster@roc.az.gov'>webmaster@roc.az.gov</a>.");
            } else {
                searchScores.sort(searchSortFunction);
                var topMarks = 0;
                var secondMarks = 0;
                var thirdMarks = 0;
                var fourthMarks = 0;
                var fifthMarks = 0;
                var topMarksA = [];
                var secondMarksA = [];
                var thirdMarksA = [];
                var fourthMarksA = [];
                var fifthMarksA = [];
                for ( s = 0; s < searchScores.length; s++ ) {
                    if ( searchScores[s][1] > 0 ) { 
                        //console.log("score = " + searchScores[s][1]);
                        if ( topMarks == 0 ) { 
                            topMarks = searchScores[s][1];
                            //console.log("topMarks = " + topMarks);
                        } else if ( topMarks > 0 && secondMarks == 0 ) { 
                            secondMarks = searchScores[s][1];
                        } else if ( topMarks > 0 && secondMarks > 0 && thirdMarks == 0 ) { 
                            thirdMarks = searchScores[s][1];
                        } else if ( topMarks > 0 && secondMarks > 0 && thirdMarks > 0 && fourthMarks == 0 ) { 
                            fourthMarks = searchScores[s][1];
                        } else if ( topMarks > 0 && secondMarks > 0 && thirdMarks > 0 && fourthMarks > 0 && fifthMarks == 0 ) { 
                            fifthMarks = searchScores[s][1];
                        }  
                        if ( topMarks == searchScores[s][1] ) { 
                            topMarksA[topMarksA.length] = [ searchScores[s][0], searchScores[s][1] ];
                            //console.log("Added to array");
                        } else if ( secondMarks == searchScores[s][1] ) { 
                            secondMarksA[secondMarksA.length] = [ searchScores[s][0], searchScores[s][1] ];
                        } else if ( thirdMarks == searchScores[s][1] ) { 
                            thirdMarksA[thirdMarksA.length] = [ searchScores[s][0], searchScores[s][1] ];
                        } else if ( fourthMarks == searchScores[s][1] ) { 
                            fourthMarksA[fourthMarksA.length] = [ searchScores[s][0], searchScores[s][1] ];
                        } else if ( fifthMarks == searchScores[s][1] ) { 
                            fifthMarksA[fifthMarksA.length] = [ searchScores[s][0], searchScores[s][1] ];
                        } 
                    }
                }
                //console.log(topMarksA);
                if ( topMarksA.length > 0 ) { topMarksA.sort(function ( a, b ) { return 0.5 - Math.random(); }); }
                if ( secondMarksA.length > 0 ) { secondMarksA.sort(function ( a, b ) { return 0.5 - Math.random(); }); }
                if ( thirdMarksA.length > 0 ) { thirdMarksA.sort(function ( a, b ) { return 0.5 - Math.random(); }); }
                if ( fourthMarksA.length > 0 ) { fourthMarksA.sort(function ( a, b ) { return 0.5 - Math.random(); }); }
                if ( fifthMarksA.length > 0 ) { fifthMarksA.sort(function ( a, b ) { return 0.5 - Math.random(); }); }
                var searchArrays = [ topMarksA, secondMarksA, thirdMarksA, fourthMarksA, fifthMarksA ];
                var lastScoreShown = 0;
                var onlyPerfect = 0;
                for ( s = 0; s < searchArrays.length; s++ ) { 
                    for ( ss = 0; ss < searchArrays[s].length; ss++ ) {
                        if ( searchArrays[s][ss][1] != lastScoreShown && criteriaFound > 1 ) {
                            if ( searchArrays[s][ss][1] < criteriaFound && onlyPerfect == 0 ) { 
                                if ( ss == 0 ) {
                                    returnHtml += '<h5 class="fullClear redText">Sorry, no results matched all of your criteria.</h5>';
                                } 
                                onlyPerfect = 1; 
                            }
                            if ( searchArrays[s][ss][1] == criteriaFound ) { 
                                returnHtml += '<h6 class="fullClear">These results matched all of your criteria.</h6>';
                                onlyPerfect = 1; 
                            } else {
                                returnHtml += '<h6 class="fullClear marginTop30">These results matched ' + searchArrays[s][ss][1] + ' of your criteria.</h6>';
                            }
                            lastScoreShown = searchArrays[s][ss][1];
                        } 
                        if ( searchArrays[s][ss][1] > 0 ) { 
                            returnHtml += '<div class="card searchResult">';
                            if ( possibles[searchArrays[s][ss][0]]['stype'] == "company" ) {
                                returnHtml += '<a href="javascript:showContractorInfo(' + searchArrays[s][ss][0] + ');"><h4>' + possibles[searchArrays[s][ss][0]]['name'] + '</h4></a>';
                                returnHtml += '<p>';
                                if ( possibles[searchArrays[s][ss][0]]['status'].toLowerCase() == "current" ) {
                                    returnHtml += 'Status: <span class="licenseCurrent">Current</span><br>';
                                } else if ( possibles[searchArrays[s][ss][0]]['status'].toLowerCase() == "suspended" ) {
                                    returnHtml += 'Status: <span class="licenseSuspended">Suspended</span><br>';
                                } else if ( possibles[searchArrays[s][ss][0]]['status'].toLowerCase() == "cancelled" ) {
                                    returnHtml += 'Status: <span class="licenseCancelled">Cancelled</span><br>';
                                } else {
                                    returnHtml += 'Status: <span class="licenseOther">Other</span><br>';
                                }
                                returnHtml += 'Qualified Party: ' + possibles[searchArrays[s][ss][0]]['qp'] + '<br>';
                                if ( possibles[searchArrays[s][ss][0]]['otherParties'].trim() != '' ) { 
                                    returnHtml += 'Additional Parties: ';
                                    var ops = possibles[searchArrays[s][ss][0]]['otherParties'].split('||');
                                    for ( op = 0; op < ops.length; op++ ) {
                                        if ( op > 0 ) { returnHtml += ", "; }
                                        var opc = ops[op].split("|");
                                        returnHtml += opc[0] + ' (' + opc[1] + ')';
                                    }
                                    returnHtml += '<br>';
                                }
                                if ( possibles[searchArrays[s][ss][0]]['city'].trim() != '' ) { 
                                    returnHtml += 'Home City: ' + possibles[searchArrays[s][ss][0]]['city'] + '<br>';
                                    if ( possibles[searchArrays[s][ss][0]]['serviceArea'].trim() != '' ) { 
                                        returnHtml += 'Service Area: ' + possibles[searchArrays[s][ss][0]]['serviceArea'] + '<br>';
                                    }
                                }
                                if ( possibles[searchArrays[s][ss][0]]['licenseClass'].trim() != '' ) { 
                                    returnHtml += 'License: #' + possibles[searchArrays[s][ss][0]]['licenseno'] + ', ' + possibles[searchArrays[s][ss][0]]['licenseClass'] + '<br>';
                                }
                                returnHtml += '</p>';
                            } else if ( possibles[searchArrays[s][ss][0]]['stype'] == "person" ) {
                                returnHtml += '<h4>' + possibles[searchArrays[s][ss][0]]['name'] + '</h4>';
                                returnHtml += '<p>';
                                returnHtml += possibles[searchArrays[s][ss][0]]['title'] + '<br>';
                                if ( possibles[searchArrays[s][ss][0]]['company'].trim() != '' ) { 
                                    returnHtml += 'Company Name: ' + possibles[searchArrays[s][ss][0]]['company'] + '<br>';
                                }
                                if ( possibles[searchArrays[s][ss][0]]['licenses'].trim() != '' ) { 
                                    returnHtml += 'License #s: ';
                                    var lics = possibles[searchArrays[s][ss][0]]['licenses'].split(',');
                                    var liclink = '';
                                    for ( li = 0; li < lics.length; li++ ) { 
                                        if ( li > 0 ) { returnHtml += ', '; }
                                        for ( la = 0; la < possibles.length; la++ ) { 
                                            if ( possibles[la]['licenseno'] != undefined ) {
                                                if ( possibles[la]['licenseno'] == lics[li] ) { 
                                                    liclink = la;
                                                } 
                                            }
                                        }
                                        if ( liclink != '' ) { 
                                            returnHtml += '<a href="javascript:showContractorInfo(' + liclink + ');" target="_blank"># ' + lics[li] + '</a>';
                                        } else {
                                            returnHtml += '<a href="__contractor-search.html?license=' + lics[li] + '" target="_blank"># ' + lics[li] + '</a>';
                                        }
                                    }
                                    returnHtml += '<br>';
                                }
                                returnHtml += '</p>';
                            }
                            returnHtml += '</div>';
                        }
                    }
                }
                var mask = '<br></p>';
                var regmask = new RegExp(mask, 'gi');
                var rep  = '</p>';
                returnHtml = returnHtml.replace(regmask,rep);
                for ( ff = 0; ff < searchCriteriaArr.length; ff++ ) { 
                    mask = searchCriteriaArr[ff];
                    if ( mask.trim() != "" ) {
                        regmask = new RegExp(mask, 'gi');
                        rep  = '<strong>' + searchCriteriaArr[ff] + '</strong>';
                        returnHtml = returnHtml.replace(regmask,rep);
                    }
                }
                if ( document.getElementById('cSearchResults') != null ) {
                    returnHtml = '<h3 class="fullClear lineOnBottom">Search Results</h3>' + returnHtml;
                    document.getElementById('cSearchResults').innerHTML = returnHtml;
                    $('#cSearchResults').show();
                }
            }
        } else { 
            displayError("Please enter something into the search box above or add some critera such as the city you want to search in or the type of licensee you're looking for to get search results.");
        }
    }
    if ( document.getElementById('cSearching') != null ) {
        document.getElementById('cSearching').style.display = 'none';
    }
    /*
    if ( document.getElementById('cSearchKeywords') != null ) {
        var keys = document.getElementById('cSearchKeywords').value;
        if ( keys.trim() != '' ) { 
            contractorSearchRemoveCriteria(keys);
        }
    }
    */
}

function shareGetLicenseNo () {
    if ( document.forms['shareByText'] != null ) {
        if ( document.forms['shareByText'].licenseno != null ) { 
            document.forms['shareByText'].licenseno.value = $("#cLicenseNumber").html();
        }
    }
    if ( document.forms['shareByEmail'] != null ) {
        if ( document.forms['shareByEmail'].licenseno != null ) { 
            document.forms['shareByEmail'].licenseno.value = $("#cLicenseNumber").html();
        }
    }
}

function showContractorInfo ( licno ) {
    if ( possibles[licno] != null ) {
        if ( document.getElementById('cSearchResults') != null ) {
            $('#cSearchResults').hide();
        }
        if ( document.getElementById('cSearchReturnToResults') != null ) {
            $('#cSearchReturnToResults').show();
        }
        if ( document.getElementById('cSearchReturnToResultsB') != null ) {
            $('#cSearchReturnToResultsB').show();
        }
        if ( document.getElementById('licenseInfo') != null ) {
            $("#cLicenseNumber").html(possibles[licno]['licenseno']);
            if ( document.forms['shareByText'] != null ) {
                if ( document.forms['shareByText'].licenseno != null ) { 
                    document.forms['shareByText'].licenseno.value = possibles[licno]['licenseno'];
                }
            }
            if ( document.forms['shareByEmail'] != null ) {
                if ( document.forms['shareByEmail'].licenseno != null ) { 
                    document.forms['shareByEmail'].licenseno.value = possibles[licno]['licenseno'];
                }
            }
            if ( document.getElementsByName('licenseno') != null ) {
                for ( n = 0; n < document.getElementsByName('licenseno').length; n++ ) {
                    document.getElementsByName('licenseno')[n].value = possibles[licno]['licenseno'];
                }
            }
            //if ( document.getElementById('shareThisLicense') != null && document.getElementById('shareThisLicense2') != null ) { 
            //    document.getElementById('shareThisLicense2').innerHTML = document.getElementById('shareThisLicense').innerHTML;
            //}
            $("#cName").html(possibles[licno]['name']);
            $("#cAddress").html(possibles[licno]['address']);
            $("#cCity").html(possibles[licno]['city']);
            $("#cState").html(possibles[licno]['state']);
            $("#cZip").html(possibles[licno]['zip']);
            $("#cPrimaryPhone").html(possibles[licno]['primaryphone']);
            $("#cStatus").html(possibles[licno]['status']);
            $("#cStatus").removeClass();
            $("#cInfoMessage").hide();
            if ( possibles[licno]['status'].toLowerCase().indexOf("cancel") > -1 || possibles[licno]['status'].toLowerCase().indexOf("inactive") > -1 || possibles[licno]['status'].toLowerCase().indexOf("suspend") > -1 || possibles[licno]['status'].toLowerCase().indexOf("expire") > -1 ) {
                $("#cStatus").addClass("btn-danger");
                $("#cInfoMessage").addClass("cInfoAlert");
                $("#cInfoMessage").html("This contractor is not able to contract with this license at this time. This contractor may be operating with other current license.");
                $("#cInfoMessage").show();
            } else if ( possibles[licno]['status'].toLowerCase().indexOf("current") > -1 ) {
                $("#cStatus").addClass("btn-success");
            } 
            $("#cWebsite").html( function () {
                var addHttp = '';
                var restrictedSites = [ 'facebook.com','linkedin.com','twitter.com','instagram.com','.ru/','youtube.com','youtu.be','vimeo.com','dailymotion.com' ];
                if ( possibles[licno]['website'] != '' && ( possibles[licno]['website'].toLowerCase().indexOf('http') == 0 || possibles[licno]['website'].toLowerCase().indexOf('www') == 0 ) ) { 
                    if ( possibles[licno]['website'].toLowerCase().indexOf('http') != 0 ) { addHttp = "http://"; } 
                    for ( r = 0; r < restrictedSites.length; r++ ) { 
                        if ( possibles[licno]['website'].indexOf(restrictedSites[r]) > -1 ) {
                            return 'N/A';
                        }
                    }
                    return '<a href="' + possibles[licno]['website'] + '" target="_blank">' + possibles[licno]['website'] + '</a>';
                } else { 
                    return 'N/A';
                }
            });
            $("#cHours").html( function () { 
                var startH = '';
                var endH = '';
                var wkDays = '';
                var wkEnds = '';
                var ret = '';
                if ( possibles[licno]['hours'].indexOf('start') > -1 ) { 
                    startH = possibles[licno]['hours'].substring((possibles[licno]['hours'].indexOf('start') + 6),(possibles[licno]['hours'].indexOf('start:') + 10));
                    if ( parseInt(startH.substring(0,2)) < 12 ) { 
                        startH = startH.substring(0,2) + ":" + startH.substring(2) + " AM"; 
                    } else {
                        startH = (parseInt(startH.substring(0,2)) - 12) + ":" + startH.substring(2) + " PM"; 
                    }
                    if ( startH.substring(0,1) == "0" ) { startH = startH.substring(1); }
                }
                if ( possibles[licno]['hours'].indexOf('end') > -1 ) { 
                    endH = possibles[licno]['hours'].substring((possibles[licno]['hours'].indexOf('end') + 4),(possibles[licno]['hours'].indexOf('end:') + 8));
                    if ( parseInt(endH.substring(0,2)) < 12 ) { 
                        endH = endH.substring(0,2) + ":" + endH.substring(2) + " AM"; 
                    } else {
                        endH = (parseInt(endH.substring(0,2)) - 12) + ":" + endH.substring(2) + " PM"; 
                    }
                    if ( endH.substring(0,1) == "0" ) { endH = endH.substring(1); }
                }
                if ( possibles[licno]['hours'].indexOf('Weekdays') > -1 ) { wkDays = "Weekdays";} 
                if ( possibles[licno]['hours'].toLowerCase().indexOf('monday') > -1 ) { if ( wkDays != '' ) { wkDays += ", "; } wkDays += "Mondays"; }
                if ( possibles[licno]['hours'].toLowerCase().indexOf('tuesday') > -1 ) { if ( wkDays != '' ) { wkDays += ", "; } wkDays += "Tuesdays"; }
                if ( possibles[licno]['hours'].toLowerCase().indexOf('wednesday') > -1 ) { if ( wkDays != '' ) { wkDays += ", "; } wkDays += "Wednesdays"; } 
                if ( possibles[licno]['hours'].toLowerCase().indexOf('thursday') > -1 ) { if ( wkDays != '' ) { wkDays += ", "; } wkDays += "Thursdays"; }
                if ( possibles[licno]['hours'].toLowerCase().indexOf('friday') > -1 ) { if ( wkDays != '' ) { wkDays += ", "; } wkDays += "Fridays"; }
                if ( possibles[licno]['hours'].indexOf('Weekends') > -1 ) { wkEnds = "Weekends";} 
                if ( possibles[licno]['hours'].toLowerCase().indexOf('saturday') > -1 ) { if ( wkEnds != '' ) { wkEnds += ", "; } wkEnds += "Saturdays"; }
                if ( possibles[licno]['hours'].toLowerCase().indexOf('subday') > -1 ) { if ( wkEnds != '' ) { wkEnds += ", "; } wkEnds += "Sundays"; }
                ret = startH;
                if ( ret != '' && endH != '' ) { if ( startH != '' ) { ret += ' to '; } else { ret += ', '; } }
                ret += endH;
                if ( ret != '' && wkDays != '' ) { ret += ', '; }
                ret += wkDays;
                if ( ret != '' && wkEnds != '' ) { ret += ', '; }
                ret += wkEnds;
                return ret;
            });
            $("#cServiceArea").html(possibles[licno]['serviceArea']);
            $("#cServiceType").html( function () { 
                var ret = '';
                if ( possibles[licno]['serviceType'].indexOf('new') > -1 ) { 
                    ret += 'New Construction';
                } else if ( possibles[licno]['serviceType'].indexOf('remodel') > -1 ) { 
                    if ( ret != '' ) { ret += ', '; }
                    ret += 'Remodels, Upgrades &amp; Updates';
                } else if ( possibles[licno]['serviceType'].indexOf('remodel') > -1 ) {  
                    if ( ret != '' ) { ret += ', '; }
                    ret += 'Repairs';
                } return ret;
            });
            $("#cClass").html(possibles[licno]['class']);
            $("#cType").html(possibles[licno]['type']);
            $("#cEntity").html(possibles[licno]['entity']);
            $("#cFirstIssued").html(possibles[licno]['firstIssued']);
            $("#cRenewedThru").html(possibles[licno]['renewedThru']);
            $("#cLicenseClass").html(possibles[licno]['licenseClass']);
            $("#cComments").html(possibles[licno]['comments']);
            $("#cQP").html(possibles[licno]['qp']);
            $("#cQPPosition").html(possibles[licno]['qpposition']);
            $("#cQualDate").html('Qual. Date ' + possibles[licno]['qualDate']);
            $("#cOtherParties").html( function () { 
                var ret = '';
                var op = possibles[licno]['otherParties'].split("||");
                for ( opp = 0; opp < op.length; opp++ ) { 
                    var op3 = op[opp].split("|");
                    if ( op3[0].trim() != '' ) {
                        ret += op3[0] + ", " + op3[1];
                    }
                }
                return ret;
            });
            $("#cBondNumber").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondNumber'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondNumber'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] " + op[opp];
                    }
                } else { 
                    ret = possibles[licno]['bondNumber'];
                }
                return ret;
            });
            $("#cBondEffective").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondEffective'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondEffective'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] " + op[opp];
                    }
                } else { 
                    ret = possibles[licno]['bondEffective'];
                }
                return ret;
            });
            $("#cBondCancelled").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondCancelled'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondCancelled'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] " + op[opp];
                    }
                } else { 
                    ret = possibles[licno]['bondCancelled'];
                }
                return ret;
            });
            $("#cBondAmount").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondAmount'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondAmount'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] $ " + op[opp];
                    }
                } else { 
                    ret = "$ " + possibles[licno]['bondAmount'];
                }
                return ret;
            });
            $("#cBondPaid").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondPaid'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondPaid'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] $ " + op[opp];
                    }
                } else { 
                    ret = "$ " + possibles[licno]['bondPaid'];
                }
                return ret;
            });
            $("#cBondAvailable").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondAvailable'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondAvailable'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] $ " + op[opp];
                    }
                } else { 
                    ret = "$ " + possibles[licno]['bondAvailable'];
                }
                return ret;
            });
            $("#cBondCompany").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondCompany'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondCompany'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] " + op[opp];
                    }
                } else { 
                    ret = possibles[licno]['bondCompany'];
                }
                return ret;
            });
            $("#cBondNotes").html( function () { 
                var ret = '';
                if ( possibles[licno]['bondNotes'].indexOf("|") > -1 ) { 
                    var op = possibles[licno]['bondNotes'].split("|");
                    for ( opp = 0; opp < op.length; opp++ ) {
                        if ( opp > 0 ) { ret += "<br>"; } 
                        ret += "[" + (opp + 1) + "] " + op[opp];
                    }
                } else { 
                    ret = possibles[licno]['bondNotes'];
                }
                return ret;
            });
            $("#cComplaintsOpen").html(possibles[licno]['complaintsOpen']);
            $("#cComplaintsResolved").html(possibles[licno]['complaintsResolved']);
            $("#cComplaintsDenied").html(possibles[licno]['complaintsDenied']);
            $("#cComplaintsDisciplined").html(possibles[licno]['complaintsDisciplined']);
            $("#cComplaintsBankruptcy").html(possibles[licno]['complaintsBankruptcy']);
            var now = moment().format("MMMM Do, YYYY, h:mm A");
            $("#cTodaysDate").html(now);
            $("#licenseInfo").show();

            addContractorViewStats( possibles[licno]['licenseno'], searchCriteria );
        } else { 
            displayError("Sorry, there was an error pulling up the license information. Please reload the page and try again.");
        }
    } else {
        alert("Sorry, there was an error. We could not find that license number.");
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function saveLicenseLocally () { 
    if ( $('#cLicenseNumber').html() != "" ) { 
        if (typeof(Storage) !== "undefined") {
            if ( localStorage.rocLicSaved != undefined ) {
                if ( localStorage.rocLicSaved.indexOf($('#cLicenseNumber').html()) < 0 ) { 
                    localStorage.setItem("rocLicSaved", localStorage.rocLicSaved + "|" + $('#cLicenseNumber').html());
                    $('#shareBySave').html("Saved! This license will now appear on this page whenever you return using this browser.");
                } else { 
                    $('#shareBySave').html("Previously saved! This license will appear on this page whenever you return using this browser.");
                }
            } else {
                localStorage.setItem("rocLicSaved", $('#cLicenseNumber').html());
                $('#shareBySave').html("Saved! This license will now appear on this page whenever you return using this browser.");
            }
        } else {
            $('#shareBySave').html("We're sorry but we couldn't save this license to your browser.");
        }
    } else {
        $('#shareBySave').html("We're sorry but we couldn't find the license number to save to your browser.");
    }
    $('#shareBySave').show();
}

function removeLicenseLocally ( lic ) { 
    if ( lic != "" ) { 
        if (typeof(Storage) !== "undefined") {
            if ( localStorage.rocLicSaved != undefined ) {
                if ( localStorage.rocLicSaved.indexOf(lic) > -1 ) {
                    var ls =  localStorage.rocLicSaved;
                    ls = ls.replace(lic, '');
                    ls = ls.replace('||', '|');
                    localStorage.setItem('rocLicSaved',ls);
                    if ( document.getElementById('savedLicenseNumbers') != null ) {
                        var sv = document.getElementById('savedLicenseNumbers').innerHTML;
                        var ret = '<span class="cSavedSearchOption"><a href="javascript:openSavedLicenseLocally(' + lic + ');">' + lic + '</a> <sup><small><a href="javascript:removeLicenseLocally(' + lic + ');">X</a></small></sup></span>';
                        sv = sv.replace(ret, '');
                        if ( sv.trim() == '' || sv.trim() == '<strong>Open Previous Saved Licenses:</strong>' ) {
                            document.getElementById('savedLicenseNumbers').style.display = 'none';
                        }
                        document.getElementById('savedLicenseNumbers').innerHTML = sv;
                    }
                    displayMessage("This license number is no longer saved in your browser.");
                } else { 
                    displayMessage("Sorry but we couldn't find this license number in your saved items.");
                }
            } else {
                displayMessage("Sorry but we couldn't find any license numbers saved in this browser.");
            }
        } else {
            displayMessage("We're sorry but we couldn't remove this license to your browser.");
        }
    } else {
        displayMessage("We're sorry but we couldn't find the license number to remove it from your browser.");
    }
}

function checkSavedLicenseLocally () { 
    if ( $('#savedLicenseNumbers') ) { 
        if (typeof(Storage) !== "undefined") {
            $('#localStorageAllowed').show();
            if ( localStorage.rocLicSaved != undefined ) { 
                var savedLics = localStorage.rocLicSaved;
                var savedLicsA = savedLics.split("|");
                var ret = "";
                for ( s = 0; s < savedLicsA.length; s++ ) {
                    if ( savedLicsA[s] != "" && savedLicsA[s] != undefined && savedLicsA[s] !== "undefined" ) {
                        ret += '<span class="cSavedSearchOption"><a href="javascript:openSavedLicenseLocally(' + savedLicsA[s] + ');">' + savedLicsA[s] + '</a> <sup><small><a href="javascript:removeLicenseLocally(' + savedLicsA[s] + ');">X</a></small></sup></span>';
                    }
                }
                if ( ret != "" ) { ret = "<strong>Open Previous Saved Licenses:</strong> " + ret; }
                $('#savedLicenseNumbers').show();
                $('#savedLicenseNumbers').html(ret);
            } 
        } 
    } 
}

function openSavedLicenseLocally ( lic ) {
    if ( document.getElementById('cSearchKeywords') != null ) { 
        document.getElementById('cSearchKeywords').value = lic;
    }
    contractorSearch();
}

function showShareSent ( t ) {
    if ( t == 'email' ) { 
        if ( document.getElementById('shareEmailMsg') != null ) { 
            document.getElementById('shareEmailMsg').innerHTML = "<br><strong>Your email has been sent!</strong>";
        }
    } else if ( t == 'text' ) { 
        if ( document.getElementById('shareTextMsg') != null ) { 
            document.getElementById('shareTextMsg').innerHTML = "<br><strong>Your text has been sent!</strong>";
        }
    }
}


function setPresetCriteria ( p ) {
    contractorSearchClearCriteria();
    if ( p == "remodelKitchen" ) {
        contractorSearchAddCriteria('B-3 General Remodeling and Repair');
        contractorSearchAddCriteria('Remodel');
        contractorSearchAddCriteria('Kitchen');
    } else if ( p == "remodelBath" ) {
        contractorSearchAddCriteria('B-3 General Remodeling and Repair');
        contractorSearchAddCriteria('Remodel');
        contractorSearchAddCriteria('Bathroom');
    } else if ( p == "homeAddition" ) {
        contractorSearchAddCriteria('B-4 General Residential Engineering');
        contractorSearchAddCriteria('Remodel');
        contractorSearchAddCriteria('Home Addition');
    } else if ( p == "landscaping" ) {
        contractorSearchAddCriteria('R-21 Landscaper');
        contractorSearchAddCriteria('Landscaping');
        contractorSearchAddCriteria('Exterior');
        contractorSearchAddCriteria('Landscape Design');
    } else if ( p == "acWentOut" ) {
        contractorSearchAddCriteria('HVAC');
        contractorSearchAddCriteria('Air Conditioning');
        contractorSearchAddCriteria('Repair');
    } else if ( p == "paintExterior" ) {
        contractorSearchAddCriteria('Paint');
        contractorSearchAddCriteria('Exterior');
        contractorSearchAddCriteria('Home');
    } else if ( p == "paintInterior" ) {
        contractorSearchAddCriteria('Paint');
        contractorSearchAddCriteria('Interior');
        contractorSearchAddCriteria('Home');
    } else if ( p == "repairFloorCoverings" ) {
        contractorSearchAddCriteria('Floor Coverings');
        contractorSearchAddCriteria('Hardwood');
        contractorSearchAddCriteria('Carpet');
        contractorSearchAddCriteria('Tile');
        contractorSearchAddCriteria('Repair');
    } else if ( p == "addFloorCoverings" ) {
        contractorSearchAddCriteria('Floor Coverings');
        contractorSearchAddCriteria('Hardwood');
        contractorSearchAddCriteria('Carpet');
        contractorSearchAddCriteria('Tile');
        contractorSearchAddCriteria('Installation');
    } else if ( p == "repairRoof" ) {
        contractorSearchAddCriteria('Roof');
        contractorSearchAddCriteria('Repair');
        contractorSearchAddCriteria('Emergency');
    } else if ( p == "repairPlumbing" ) {
        contractorSearchAddCriteria('R-37 Plumber');
        contractorSearchAddCriteria('Repair');
        contractorSearchAddCriteria('Emergency');
    } else if ( p == "electrician" ){
        contractorSearchAddCriteria('R-11 Electrical');
        contractorSearchAddCriteria('Repair');
        contractorSearchAddCriteria('Emergency');
    }
    contractorSearchAddCriteria('Current');
    contractorSearch();
}

function addContractorViewStats ( licno, searchterms ) {
    /*
    $.get("__contractor-search_share.cfm", { lic: licno, sterms: searchterms } )
        .done( function (data) {
            console.log("Data recorded for license no: " + licno);
        });
    */
   if ( document.getElementById('shareSend') != null ) { 
        document.getElementById('shareSend').src = 'search/node/contractor%20search%20share%20cfm.html?lic=' + licno + '&sterms=' + searchterms;
        console.log("Data recorded for license no: " + licno);
   }
}

;
(function ($) {
  Drupal.behaviors.wysiwygaccordion = {
    attach: function (context, settings) {
      $('.accordion-content').once(function () {
        var content = this;
        var clickable;

        $(this).siblings(':header').once(function () {
          if ($(this).siblings('.read-more').length > 0) {
            clickable = $(this).siblings('.read-more');
          } else {
            clickable = this;
          }
        });

        $(content).hide();
        $(clickable).prepend('<span class="glyphicon-chevron-right glyphicon" />');
        $(clickable).addClass('accordion-clicker');
        $(clickable).click(function () {
          $(this).toggleClass('open');
          $(this).children('.glyphicon').toggleClass('glyphicon-chevron-right');
          $(this).children('.glyphicon').toggleClass('glyphicon-chevron-down');
          $(this).siblings('.accordion-content').slideToggle('slow');


          if ($(this).hasClass('read-more') && $(this).hasClass('open')) {
            $(this).html('<span class="glyphicon-chevron-down glyphicon" />Close');
          } else if ($(this).hasClass('read-more')) {
            $(this).html('<span class="glyphicon-chevron-right glyphicon" />Read More');
          }
        });
      });
    }
  }
})(jQuery);
;
(function ($) {

Drupal.extlink = Drupal.extlink || {};

Drupal.extlink.attach = function (context, settings) {
  if (!settings.hasOwnProperty('extlink')) {
    return;
  }

  // Strip the host name down, removing ports, subdomains, or www.
  var pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
  var host = window.location.host.replace(pattern, '$3$4');
  var subdomain = window.location.host.replace(pattern, '$1');

  // Determine what subdomains are considered internal.
  var subdomains;
  if (settings.extlink.extSubdomains) {
    subdomains = "([^/]*\\.)?";
  }
  else if (subdomain == 'www.' || subdomain == '') {
    subdomains = "(www\\.)?";
  }
  else {
    subdomains = subdomain.replace(".", "\\.");
  }

  // Build regular expressions that define an internal link.
  var internal_link = new RegExp("^https?://" + subdomains + host, "i");

  // Extra internal link matching.
  var extInclude = false;
  if (settings.extlink.extInclude) {
    extInclude = new RegExp(settings.extlink.extInclude.replace(/\\/, '\\'), "i");
  }

  // Extra external link matching.
  var extExclude = false;
  if (settings.extlink.extExclude) {
    extExclude = new RegExp(settings.extlink.extExclude.replace(/\\/, '\\'), "i");
  }

  // Extra external link CSS selector exclusion.
  var extCssExclude = false;
  if (settings.extlink.extCssExclude) {
    extCssExclude = settings.extlink.extCssExclude;
  }

  // Extra external link CSS selector explicit.
  var extCssExplicit = false;
  if (settings.extlink.extCssExplicit) {
    extCssExplicit = settings.extlink.extCssExplicit;
  }

  // Find all links which are NOT internal and begin with http as opposed
  // to ftp://, javascript:, etc. other kinds of links.
  // When operating on the 'this' variable, the host has been appended to
  // all links by the browser, even local ones.
  // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
  // available in jQuery 1.0 (Drupal 5 default).
  var external_links = new Array();
  var mailto_links = new Array();
  $("a:not(." + settings.extlink.extClass + ", ." + settings.extlink.mailtoClass + "), area:not(." + settings.extlink.extClass + ", ." + settings.extlink.mailtoClass + ")", context).each(function(el) {
    try {
      var url = this.href.toLowerCase();
      if (url.indexOf('http') == 0
        && ((!url.match(internal_link) && !(extExclude && url.match(extExclude))) || (extInclude && url.match(extInclude)))
        && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
        && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
        external_links.push(this);
      }
      // Do not include area tags with begin with mailto: (this prohibits
      // icons from being added to image-maps).
      else if (this.tagName != 'AREA' 
        && url.indexOf('mailto:') == 0 
        && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
        && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
        mailto_links.push(this);
      }
    }
    // IE7 throws errors often when dealing with irregular links, such as:
    // <a href="node/10"></a> Empty tags.
    // <a href="http://user:pass@example.com">example</a> User:pass syntax.
    catch (error) {
      return false;
    }
  });

  if (settings.extlink.extClass) {
    Drupal.extlink.applyClassAndSpan(external_links, settings.extlink.extClass);
  }

  if (settings.extlink.mailtoClass) {
    Drupal.extlink.applyClassAndSpan(mailto_links, settings.extlink.mailtoClass);
  }

  if (settings.extlink.extTarget) {
    // Apply the target attribute to all links.
    $(external_links).attr('target', settings.extlink.extTarget);
  }

  Drupal.extlink = Drupal.extlink || {};

  // Set up default click function for the external links popup. This should be
  // overridden by modules wanting to alter the popup.
  Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function() {
    if (settings.extlink.extAlert) {
      return confirm(settings.extlink.extAlertText);
    }
   }

  $(external_links).click(function(e) {
    return Drupal.extlink.popupClickHandler(e);
  });
};

/**
 * Apply a class and a trailing <span> to all links not containing images.
 *
 * @param links
 *   An array of DOM elements representing the links.
 * @param class_name
 *   The class to apply to the links.
 */
Drupal.extlink.applyClassAndSpan = function (links, class_name) {
  var $links_to_process;
  if (Drupal.settings.extlink.extImgClass){
    $links_to_process = $(links);
  }
  else {
    var links_with_images = $(links).find('img').parents('a');
    $links_to_process = $(links).not(links_with_images);
  }
  $links_to_process.addClass(class_name);
  var i;
  var length = $links_to_process.length;
  for (i = 0; i < length; i++) {
    var $link = $($links_to_process[i]);
    if ($link.css('display') == 'inline' || $link.css('display') == 'inline-block') {
      if (class_name == Drupal.settings.extlink.mailtoClass) {
        $link.append('<span class="' + class_name + '"><span class="element-invisible"> ' + Drupal.settings.extlink.mailtoLabel + '</span></span>');
      }
      else {
        $link.append('<span class="' + class_name + '"><span class="element-invisible"> ' + Drupal.settings.extlink.extLabel + '</span></span>');
      }
    }
  }
};

Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
Drupal.behaviors.extlink.attach = function (context, settings) {
  // Backwards compatibility, for the benefit of modules overriding extlink
  // functionality by defining an "extlinkAttach" global function.
  if (typeof extlinkAttach === 'function') {
    extlinkAttach(context);
  }
  else {
    Drupal.extlink.attach(context, settings);
  }
};

})(jQuery);
;
