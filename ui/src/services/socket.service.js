/* eslint-disable */
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

const apiSocket = 'http://localhost:8080';

const topics = {
    // USER
    USER_CREATED_SUCCESS_EVENT: 'UserCreatedSuccessEvent',
    USER_CREATED_FAILED_EVENT: 'UserCreatedFailedEvent',
    EMAIL_VERIFIED_SUCCESS_EVENT: 'EmailVerifiedSuccessEvent',
    EMAIL_VERIFIED_FAILED_EVENT: 'EmailVerifiedFailedEvent',
    PASSWORD_CHANGED_SUCCESS_EVENT: 'PasswordChangedSuccessEvent',
    PASSWORD_CHANGED_FAILED_EVENT: 'PasswordChangedFailedEvent',
    USER_DELETED_SUCCESS_EVENT: 'UserDeletedSuccessEvent',
    USER_DELETED_FAILED_EVENT: 'UserDeletedFailedEvent',
    USER_UPDATE_SUCCESS_EVENT: 'UserUpdatedSuccessEvent',
    USER_UPDATE_FAILED_EVENT: 'UserUpdatedFailedEvent',
    VERIFY_EMAIL_SENT_SUCCESS_EVENT: 'VerifyEmailSentSuccessEvent',
    VERIFY_EMAIL_SENT_FAILED_EVENT: 'VerifyEmailSentFailedEvent',
    // TOKEN
    FREE_TOKEN_CREATED_SUCCESS_EVENT: 'FreeTokenCreatedSuccessEvent',
    FREE_TOKEN_CREATED_FAILED_EVENT: 'FreeTokenCreatedFailedEvent',
    ORDERED_TOKEN_CREATED_SUCCESS_EVENT: 'OrderedTokenCreatedSuccessEvent',
    ORDERED_TOKEN_CREATED_FAILED_EVENT: 'OrderedTokenCreatedFailedEvent',
    TOKEN_CREATED_SUCCESS_EVENT: 'TokenCreatedSuccessEvent',
    TOKEN_CREATED_FAILED_EVENT: 'TokenCreatedFailedEvent',
    TOKEN_DELETED_SUCCESS_EVENT: 'TokenDeletedSucessEvent',
    TOKEN_DELETED_FAILED_EVENT: 'TokenDeletedFailedEvent',
    PROJECT_CREATED_SUCCESS_EVENT: 'ProjectCreatedSuccessEvent',
    PROJECT_CREATED_FAILED_EVENT: 'ProjectCreatedFailedEvent',
    // PERMISSION
    PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT: 'PermissionAssignEmailSentSuccessEvent',
    PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT: 'PermissionAssignEmailSentFailedEvent',
    PERMISSION_CREATED_SUCCESS_EVENT: 'PermissionCreatedSuccessEvent',
    PERMISSION_CREATED_FAILED_EVENT: 'PermissionCreatedFailedEvent',
    // ORDER
    ORDER_CREATED_SUCCESS_EVENT: 'OrderCreatedSuccessEvent',
    ORDER_CREATED_FAILED_EVENT: 'OrderCreatedSuccessEvent',
}

export default class SocketService {
    socket = io.connect(apiSocket);
    constructor() {
        this.socket.on('CONNECTED', (msg) => {
            console.log(msg);
        })
        this.socket.on('DISCONNECTED', (msg) => {
            console.warn(msg);
        })
    }
    invokeCheckUserCreated = new Subject();
    invokeEmailVerified = new Subject();
    invokePasswordChanged = new Subject();
    invokeUserDeleted = new Subject();
    invokeUserUpdated = new Subject();
    invokeVerifyEmailSent = new Subject();
    invokeFreeTokenCreated = new Subject();
    invokeOrderedTokenCreated = new Subject();
    invokeTokenCreated = new Subject();
    invokeTokenDelete = new Subject();
    invokePermissionAssignEmailSent = new Subject();
    invokePermissionCreated = new Subject();
    invokeOrderCreated = new Subject();

    emitEventOnUserCreated = () => {
        var self = this;
        self.socket.send(topics.USER_CREATED_SUCCESS_EVENT);
    }
    // Consume on Check Attendance updated 
    consumeEventOnUserCreated = () => {
        var self = this;
        self.socket.on(topics.USER_CREATED_SUCCESS_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeCheckUserCreated.next(event);
        });
        self.socket.on(topics.USER_CREATED_FAILED_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeCheckUserCreated.next(event);
        })
    }
    consumeEventOnEmailVerified = () => {
        var self = this;
        self.socket.on(topics.EMAIL_VERIFIED_SUCCESS_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeVerifyEmailSent.next(event);
        });
        self.socket.on(topics.EMAIL_VERIFIED_FAILED_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeVerifyEmailSent.next(event);
        })
    }
    consumeEventOnPasswordChanged = () => {
        var self = this;
        self.socket.on(topics.PASSWORD_CHANGED_SUCCESS_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokePasswordChanged.next(event);
        });
        self.socket.on(topics.PASSWORD_CHANGED_FAILED_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokePasswordChanged.next(event);
        })
    }
    consumeEventOnUserDeleted = () => {
        var self = this;
        self.socket.on(topics.USER_DELETED_SUCCESS_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeUserDeleted.next(event);
        });
        self.socket.on(topics.USER_DELETED_FAILED_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeUserDeleted.next(event);
        })
    }
    consumeEventOnUserUpdated = () => {
        var self = this;
        self.socket.on(topics.USER_UPDATE_SUCCESS_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeUserUpdated.next(event);
        });
        self.socket.on(topics.USER_UPDATE_FAILED_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeUserUpdated.next(event);
        })
    }
    consumeEventOnVerifyEmailSent = () => {
        var self = this;
        self.socket.on(topics.VERIFY_EMAIL_SENT_SUCCESS_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeVerifyEmailSent.next(event);
        });
        self.socket.on(topics.USER_UPDATE_FAILED_EVENT, function (event) {
            event = String.fromCharCode.apply(null, new Uint8Array(event))
            self.invokeVerifyEmailSent.next(event);
        })
    }
    consumeEvent
}