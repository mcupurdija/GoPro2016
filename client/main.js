import {Template} from "meteor/templating";
import {Table1, Table2, Table3} from "../imports/collections/tables";
import {EmployeeList} from "../lib/employees";

Meteor.startup(function () {

    if (Cookie.get('voted') || Session.get('voted')) {
        disableVoting();
    } else {
        $('#results-container').hide();
    }

    sAlert.config({
        effect: '',
        position: 'top',
        timeout: 2500,
        html: false,
        onRouteClose: true,
        stack: true,
        beep: false
    });
});

function disableVoting() {
    let submitBtn = $('#submit-btn');
    submitBtn.text('Hvala što ste glasali');
    submitBtn.removeClass('btn-success');
    submitBtn.addClass('btn-danger');
    submitBtn.prop('disabled', true);
    $('#voting-container').hide();
}

Template.voting.helpers({
    employees() {
        return EmployeeList;
    }
});

Template.voting.events({
    'submit form': function () {
        event.preventDefault();

        let value1 = $('#q1').val();
        let value2 = $('#q2').val();
        let value3 = $('#q3').val();

        if (value1 == 0 || value2 == 0 || value3 == 0) {
            sAlert.error('Potrebno je da odgovorite na sva pitanja!');
            return;
        }

        let doc1 = Table1.findOne({employeeId: parseInt(value1)});
        Table1.update({_id: doc1._id}, {$inc: {points: 1}});

        let doc2 = Table2.findOne({employeeId: parseInt(value2)});
        Table2.update({_id: doc2._id}, {$inc: {points: 1}});

        let doc3 = Table3.findOne({employeeId: parseInt(value3)});
        Table3.update({_id: doc3._id}, {$inc: {points: 1}});

        Cookie.set('voted', true, {
            expires: 30
        });
        Session.set('voted', true);
        disableVoting();
        $('#results-container').show();

        sAlert.success('Vaš glas je zabeležen!');
    }
});

Template.results.helpers({
    data1() {
        return Table1.find({points: {$gt: 0}}, {sort: {points: -1}}).fetch();
    },
    data2() {
        return Table2.find({points: {$gt: 0}}, {sort: {points: -1}}).fetch();
    },
    data3() {
        return Table3.find({points: {$gt: 0}}, {sort: {points: -1}}).fetch();
    }
});