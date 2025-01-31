import {ApolloClientOptions, ApolloLink, InMemoryCache, makeVar} from '@apollo/client/core';
import {IAssignment} from './excerpts/assignment.type';
import {DomainEntityTypeName} from './excerpts/domain-entity-type-name.types';
import {AssignmentTaskStatus} from './excerpts/assignment-task-status.types';

/** A reactive variable holding our Assignment list in memory. */
const assignmentList = makeVar<IAssignment[]>([
  {
    __typename: DomainEntityTypeName.Assignment,
    _id: '1',
    name: 'Assignment 1',
    assignmentTaskStatus: AssignmentTaskStatus.NotStarted
  },
  {
    __typename: DomainEntityTypeName.Assignment,
    _id: '2',
    name: 'Assignment 2',
    assignmentTaskStatus: AssignmentTaskStatus.InProgress
  },
]);

/**
 * Construct the local-only Apollo Client configuration.
 */
export function createApollo(): ApolloClientOptions<any> {
  return {
    // No external HTTP; local-only
    link: ApolloLink.empty(),
    cache: new InMemoryCache({
      typePolicies: {
        Person: {
          keyFields: ['_id'],
        },
        Query: {
          fields: {
            AssignmentListRead: {
              read() {
                return assignmentList();
              },
            },
          },
        },
      },
    }),
    // Local resolvers for handling mutations
    resolvers: {
      Mutation: {
        AssignmentUpdateAssignmentTaskStatus: (_root, variables, {cache}) => {
          let updatedAssignment: IAssignment | null = null;
          const updatedArray = assignmentList().map((assignment) => {
            if (assignment._id === variables.assignmentId) {
              updatedAssignment = {
                ...assignment,
                assignmentTaskStatus: variables.status,
              };
              return updatedAssignment;
            }
            return assignment;
          });
          assignmentList(updatedArray);
          return updatedAssignment;
        },
      },
    },
  };
}
