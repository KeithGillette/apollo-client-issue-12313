/* eslint-disable @typescript-eslint/naming-convention */
import { gql } from 'apollo-angular';
import { OperationDefinitionNode } from 'graphql';
import {AssignmentTaskStatus} from './assignment-task-status.types';
import {IAssignmentTask} from './assignment-task.type';


export const AssignmentUpdateAssignmentTaskStatus_Mutation = gql`
	mutation AssignmentUpdateAssignmentTaskTaskStatus($accountId: ID!, $assignmentId: ID!, $assignmentTaskId: ID, $status: AssignmentTaskStatus!) {
		AssignmentUpdateAssignmentTaskStatus(accountId: $accountId, assignmentId: $assignmentId, assignmentTaskId: $assignmentTaskId, status: $status) @client {
			_id
			assignmentTaskStatus
		}
	}
`;

export const AssignmentUpdateAssignmentTaskStatus_Name = (AssignmentUpdateAssignmentTaskStatus_Mutation.definitions[0] as OperationDefinitionNode).name?.value;

export interface IAssignmentUpdateAssignmentTaskStatus_RequestVariables {
	accountId: string;
	assignmentId: string;
	assignmentTaskId?: string;
	status: AssignmentTaskStatus;
}

export interface IAssignmentUpdateAssignmentTaskStatus_ResponseData {
	AssignmentUpdateAssignmentTaskStatus: {
		_id: string;
		assignmentTaskStatus: AssignmentTaskStatus;
		assignmentTaskList: IAssignmentTask[];
	};
}
