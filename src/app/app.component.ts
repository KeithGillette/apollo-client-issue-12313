import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {CommonModule} from '@angular/common';
import {ApolloCache, Reference} from '@apollo/client';

import {
  AssignmentUpdateAssignmentTaskStatus_Mutation,
  IAssignmentUpdateAssignmentTaskStatus_RequestVariables,
  IAssignmentUpdateAssignmentTaskStatus_ResponseData
} from './excerpts/assignment-update-assignment-task-status.mutation';
import {AccountViewStatus} from './excerpts/account-view-status.type';
import {DomainEntityPropertyTypeName, DomainEntityTypeName} from './excerpts/domain-entity-type-name.types';
import {AssignmentTaskStatus} from './excerpts/assignment-task-status.types';
import {IAssignment} from './excerpts/assignment.type';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  assignmentTaskStatusList = Object.keys(AssignmentTaskStatus)
  assignmentList: IAssignment[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery<{ AssignmentListRead: IAssignment[] }>({
      query: gql`
        query AssignmentListRead {
          AssignmentListRead @client {
			      _id
			      name
			      assignmentTaskStatus
			    }
	      }`
    })
      .valueChanges
      .subscribe({
        next: ({data: {AssignmentListRead}}) => {
          this.assignmentList = AssignmentListRead;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false
        }
      });
  }

  /**
   * Demonstrates a local mutation plus an 'update' function that modifies the cache after mutation.
   */
  public updateAssignmentTaskStatus(assignmentId: string, selecedStatus: string) {
    const mutationVariables = {
      accountId: 'any',
      assignmentId: assignmentId,
      assignmentTaskId: 'any',
      status: selecedStatus as AssignmentTaskStatus,
    };
    this.apollo.mutate<IAssignmentUpdateAssignmentTaskStatus_ResponseData, IAssignmentUpdateAssignmentTaskStatus_RequestVariables>({
      mutation: AssignmentUpdateAssignmentTaskStatus_Mutation,
      variables: mutationVariables,
      update: (
        apolloClientCache: ApolloCache<IAssignmentUpdateAssignmentTaskStatus_ResponseData>,
        {data: {AssignmentUpdateAssignmentTaskStatus}},
      ) => {
        if (AssignmentUpdateAssignmentTaskStatus) {
          const updatedAssignmentReference = apolloClientCache.writeFragment({
            data: AssignmentUpdateAssignmentTaskStatus,
            fragment: gql`fragment AssignmentReference on Assignment {
							_id
						}`,
          });
          apolloClientCache.modify<{ assignmentWithViewStatusList: Reference[] }>({
            id: `${DomainEntityTypeName.Account}:${mutationVariables.accountId}`,
            fields: {
              assignmentWithViewStatusList: (existingAssignmentWithAccountViewStatusReferenceList, {storeFieldName}) => {
                if (storeFieldName.includes(AccountViewStatus.Read)) {
                  if (storeFieldName.includes(AssignmentUpdateAssignmentTaskStatus.assignmentTaskStatus)) {
                    const updatedAssignmentWasAlreadyInList = existingAssignmentWithAccountViewStatusReferenceList
                      .some((assignmentWithAccountViewStatusReference) => {
                        return assignmentWithAccountViewStatusReference.__ref.includes(AssignmentUpdateAssignmentTaskStatus._id);
                      });
                    return updatedAssignmentWasAlreadyInList
                      ? existingAssignmentWithAccountViewStatusReferenceList
                      : [...existingAssignmentWithAccountViewStatusReferenceList, updatedAssignmentReference];
                  } else {
                    return existingAssignmentWithAccountViewStatusReferenceList
                      .filter((assignmentWithAccountViewStatusReference) => {
                        return assignmentWithAccountViewStatusReference.__ref !== `${DomainEntityPropertyTypeName.AssignmentWithAccountViewStatus}:${AssignmentUpdateAssignmentTaskStatus._id}`;
                      });
                  }
                } else {
                  return existingAssignmentWithAccountViewStatusReferenceList;
                }
              },
            },
          });
        }
      }
    }).subscribe()
  }
}
