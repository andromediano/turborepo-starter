-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "public"."Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "public"."GroupCode" (
    "id" VARCHAR(10) NOT NULL,
    "name" VARCHAR(16) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_group_code" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Code" (
    "id" VARCHAR(12) NOT NULL,
    "groupId" VARCHAR(10) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "sortOrder" INTEGER DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_code" PRIMARY KEY ("id","groupId")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_role" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Privilege" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_privilege" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RolePrivilege" (
    "roleId" VARCHAR(30) NOT NULL,
    "privilegeId" VARCHAR(25) NOT NULL,

    CONSTRAINT "pk_role_privilege" PRIMARY KEY ("roleId","privilegeId")
);

-- CreateTable
CREATE TABLE "public"."SecuredResource" (
    "id" TEXT NOT NULL,
    "module" VARCHAR(20) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "pattern" VARCHAR(200) NOT NULL,
    "description" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_secured_resource" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SecuredResourceRole" (
    "securedResourceId" VARCHAR(25) NOT NULL,
    "roleId" VARCHAR(30) NOT NULL,

    CONSTRAINT "pk_secured_resource_role" PRIMARY KEY ("securedResourceId","roleId")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "pageSize" INTEGER NOT NULL DEFAULT 10,
    "blockSize" INTEGER NOT NULL DEFAULT 10,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "useCreate" BOOLEAN NOT NULL DEFAULT false,
    "useComment" BOOLEAN NOT NULL DEFAULT false,
    "useReply" BOOLEAN NOT NULL DEFAULT false,
    "useAttachment" BOOLEAN NOT NULL DEFAULT false,
    "useSecret" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_board" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Article" (
    "id" TEXT NOT NULL,
    "boardId" VARCHAR(20) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "subject" VARCHAR(200),
    "hitCount" INTEGER DEFAULT 0,
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "content" OID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_article" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArticleAttachment" (
    "articleId" VARCHAR(25) NOT NULL,
    "attachmentId" VARCHAR(25) NOT NULL,
    "type" VARCHAR(2),

    CONSTRAINT "pk_article_attachment" PRIMARY KEY ("articleId","attachmentId")
);

-- CreateTable
CREATE TABLE "public"."ArticleComment" (
    "id" TEXT NOT NULL,
    "articleId" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "content" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_article_comment" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attachment" (
    "id" TEXT NOT NULL,
    "section" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "extension" VARCHAR(5),
    "size" BIGINT,
    "status" VARCHAR(2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(25),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(25),

    CONSTRAINT "pk_attachment" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "public"."Authenticator"("credentialID");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Code" ADD CONSTRAINT "fk_code_1" FOREIGN KEY ("groupId") REFERENCES "public"."GroupCode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."RolePrivilege" ADD CONSTRAINT "fk_role_privilege_1" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."RolePrivilege" ADD CONSTRAINT "fk_role_privilege_2" FOREIGN KEY ("privilegeId") REFERENCES "public"."Privilege"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."SecuredResourceRole" ADD CONSTRAINT "fk_secured_resource_role_1" FOREIGN KEY ("securedResourceId") REFERENCES "public"."SecuredResource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."SecuredResourceRole" ADD CONSTRAINT "fk_secured_resource_role_2" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "fk_article_1" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "fk_article_2" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ArticleAttachment" ADD CONSTRAINT "fk_article_attachment_1" FOREIGN KEY ("articleId") REFERENCES "public"."Article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ArticleAttachment" ADD CONSTRAINT "fk_article_attachment_2" FOREIGN KEY ("attachmentId") REFERENCES "public"."Attachment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ArticleComment" ADD CONSTRAINT "fk_article_comment_1" FOREIGN KEY ("articleId") REFERENCES "public"."Article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ArticleComment" ADD CONSTRAINT "fk_article_comment_2" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
