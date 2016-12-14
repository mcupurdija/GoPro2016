import {Meteor} from "meteor/meteor";
import {Table1, Table2, Table3} from "../imports/collections/tables";
import {EmployeeList} from "../lib/employees";


Meteor.startup(() => {

    const numberOfRecordsTable1 = Table1.find({}).count();
    const numberOfRecordsTable2 = Table2.find({}).count();
    const numberOfRecordsTable3 = Table3.find({}).count();

    if (!numberOfRecordsTable1) {
        _.forEach(EmployeeList, function (employee) {
            if (employee.employeeId > 0) {
                Table1.insert({employeeId: employee.employeeId, employeeName: employee.employeeName, points: 0});
            }
        });
    }

    if (!numberOfRecordsTable2) {
        _.forEach(EmployeeList, function (employee) {
            if (employee.employeeId > 0) {
                Table2.insert({employeeId: employee.employeeId, employeeName: employee.employeeName, points: 0});
            }
        });
    }

    if (!numberOfRecordsTable3) {
        _.forEach(EmployeeList, function (employee) {
            if (employee.employeeId > 0) {
                Table3.insert({employeeId: employee.employeeId, employeeName: employee.employeeName, points: 0});
            }
        });
    }
});
