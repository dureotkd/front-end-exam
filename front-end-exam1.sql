/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.5-10.6.15-MariaDB : Database - code_exam
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`code_exam` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;

USE `code_exam`;

/*Table structure for table `exam` */

DROP TABLE IF EXISTS `exam`;

CREATE TABLE `exam` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL,
  `body` text NOT NULL,
  `category` char(20) NOT NULL,
  `level` char(10) NOT NULL,
  `start_code` text DEFAULT NULL,
  `request` varchar(255) NOT NULL DEFAULT '',
  `answer` varchar(255) NOT NULL DEFAULT '',
  `success_user_ids` char(100) DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `exam` */

insert  into `exam`(`seq`,`title`,`body`,`category`,`level`,`start_code`,`request`,`answer`,`success_user_ids`,`reg_date`,`edit_date`) values (1,'푸드 파이트 대회','<h6><span style=\"color: #f8f8f8\">문제 설명</span></h6><p><span style=\"color: #f8f8f8\">수웅이는 매달 주어진 음식을 빨리 먹는 푸드 파이트 대회를 개최합니다. 이 대회에서 선수들은 1대 1로 대결하며, 매 대결마다 음식의 종류와 양이 바뀝니다. 대결은 준비된 음식들을 일렬로 배치한 뒤, 한 선수는 제일 왼쪽에 있는 음식부터 오른쪽으로, 다른 선수는 제일 오른쪽에 있는 음식부터 왼쪽으로 순서대로 먹는 방식으로 진행됩니다. 중앙에는 물을 배치하고, 물을 먼저 먹는 선수가 승리하게 됩니다.</span></p><p><span style=\"color: #f8f8f8\">이때, 대회의 공정성을 위해 두 선수가 먹는 음식의 종류와 양이 같아야 하며, 음식을 먹는 순서도 같아야 합니다. 또한, 이번 대회부터는 칼로리가 낮은 음식을 먼저 먹을 수 있게 배치하여 선수들이 음식을 더 잘 먹을 수 있게 하려고 합니다. 이번 대회를 위해 수웅이는 음식을 주문했는데, 대회의 조건을 고려하지 않고 음식을 주문하여 몇 개의 음식은 대회에 사용하지 못하게 되었습니다.</span></p><p><span style=\"color: #f8f8f8\">예를 들어, 3가지의 음식이 준비되어 있으며, 칼로리가 적은 순서대로 1번 음식을 3개, 2번 음식을 4개, 3번 음식을 6개 준비했으며, 물을 편의상 0번 음식이라고 칭한다면, 두 선수는 1번 음식 1개, 2번 음식 2개, 3번 음식 3개씩을 먹게 되므로 음식의 배치는 \"1223330333221\"이 됩니다. 따라서 1번 음식 1개는 대회에 사용하지 못합니다.</span></p><p><span style=\"color: #f8f8f8\">수웅이가 준비한 음식의 양을 칼로리가 적은 순서대로 나타내는 정수 배열 </span><code><span style=\"color: #f8f8f8\">food</span></code><span style=\"color: #f8f8f8\">가 주어졌을 때, 대회를 위한 음식의 배치를 나타내는 문자열을 return 하는 solution 함수를 완성해주세요.</span></p><div contenteditable=\"false\"><hr></div><h5><span style=\"color: #f8f8f8\">제한사항</span></h5><ul><li><p><span style=\"color: #f8f8f8\">2 ≤ </span><code><span style=\"color: #f8f8f8\">food</span></code><span style=\"color: #f8f8f8\">의 길이 ≤ 9</span></p></li><li><p><span style=\"color: #f8f8f8\">1 ≤ </span><code><span style=\"color: #f8f8f8\">food</span></code><span style=\"color: #f8f8f8\">의 각 원소 ≤ 1,000</span></p></li><li><p><code><span style=\"color: #f8f8f8\">food[i]</span></code><span style=\"color: #f8f8f8\">에는 칼로리가 적은 순서대로 음식의 양이 담겨 있습니다.</span></p></li><li><p><code><span style=\"color: #f8f8f8\">food[i]</span></code><span style=\"color: #f8f8f8\">는 i번 음식의 수입니다.</span></p></li><li><p><code><span style=\"color: #f8f8f8\">food[0]</span></code><span style=\"color: #f8f8f8\">은 수웅이가 준비한 물의 양이며, 항상 1입니다.</span></p></li><li><p><span style=\"color: #f8f8f8\">정답의 길이가 3 이상인 경우만 입력으로 주어집니다.</span></p></li></ul><div contenteditable=\"false\"><hr></div><h5><span style=\"color: #f8f8f8\">입출력 예</span></h5><table><thead><tr><th><p><span style=\"color: #f8f8f8\">food</span></p></th><th><p><span style=\"color: #f8f8f8\">result</span></p></th></tr></thead><tbody><tr><td><p><span style=\"color: #f8f8f8\">[1, 3, 4, 6]</span></p></td><td><p><span style=\"color: #f8f8f8\">\"1223330333221\"</span></p></td></tr><tr><td><p><span style=\"color: #f8f8f8\">[1, 7, 1, 2]</span></p></td><td><p><span style=\"color: #f8f8f8\">\"111303111\"</span></p></td></tr></tbody></table><div contenteditable=\"false\"><hr></div><h5><span style=\"color: #f8f8f8\">입출력 예 설명</span></h5><p><strong><span style=\"color: #f8f8f8\">입출력 예 #1</span></strong></p><ul><li><p><span style=\"color: #f8f8f8\">문제 예시와 같습니다.</span></p></li></ul><p><strong><span style=\"color: #f8f8f8\">입출력 예 #1</span></strong></p><ul><li><p><span style=\"color: #f8f8f8\">두 선수는 1번 음식 3개, 3번 음식 1개를 먹게 되므로 음식의 배치는 \"111303111\"입니다.</span></p></li></ul>','','0','function solution(food = [1, 3, 4, 6]) { \n\n  return \'정답을 리턴해주세요\';\n}\n\nconsole.log(solution());','[{\"food\":[1,3,4,6]},{\"food\":[1,7,1,2]}]','[1223330333221,111303111]','1/4/5/','2022-11-04 16:26:42','2024-07-19 18:03:20'),(11,'달리기 경주','<h6>문제 설명</h6><p>얀에서는 매년 달리기 경주가 열립니다. 해설진들은 선수들이 자기 바로 앞의 선수를 추월할 때 추월한 선수의 이름을 부릅니다. 예를 들어 1등부터 3등까지 \"mumu\", \"soe\", \"poe\" 선수들이 순서대로 달리고 있을 때, 해설진이 \"soe\"선수를 불렀다면 2등인 \"soe\" 선수가 1등인 \"mumu\" 선수를 추월했다는 것입니다. 즉 \"soe\" 선수가 1등, \"mumu\" 선수가 2등으로 바뀝니다.</p><p>선수들의 이름이 1등부터 현재 등수 순서대로 담긴 문자열 배열 <code>players</code>와 해설진이 부른 이름을 담은 문자열 배열 <code>callings</code>가 매개변수로 주어질 때, 경주가 끝났을 때 선수들의 이름을 1등부터 등수 순서대로 배열에 담아 return 하는 solution 함수를 완성해주세요.</p><div contenteditable=\"false\"><hr></div><h5>제한사항</h5><ul><li><p>5 ≤ <code>players</code>의 길이 ≤ 50,000</p><ul><li><p><code>players[i]</code>는 i번째 선수의 이름을 의미합니다.</p></li><li><p><code>players</code>의 원소들은 알파벳 소문자로만 이루어져 있습니다.</p></li><li><p><code>players</code>에는 중복된 값이 들어가 있지 않습니다.</p></li><li><p>3 ≤ <code>players[i]</code>의 길이 ≤ 10</p></li></ul></li><li><p>2 ≤ <code>callings</code>의 길이 ≤ 1,000,000</p><ul><li><p><code>callings</code>는 <code>players</code>의 원소들로만 이루어져 있습니다.</p></li><li><p>경주 진행중 1등인 선수의 이름은 불리지 않습니다.</p></li></ul></li></ul><div contenteditable=\"false\"><hr></div><h5>입출력 예</h5><table><thead><tr><th><p>players</p></th><th><p>callings</p></th><th><p>result</p></th></tr></thead><tbody><tr><td><p>[\"mumu\", \"soe\", \"poe\", \"kai\", \"mine\"]</p></td><td><p>[\"kai\", \"kai\", \"mine\", \"mine\"]</p></td><td><p>[\"mumu\", \"kai\", \"mine\", \"soe\", \"poe\"]</p></td></tr></tbody></table><div contenteditable=\"false\"><hr></div><h5>입출력 예 설명</h5><p>입출력 예 #1</p><p>4등인 \"kai\" 선수가 2번 추월하여 2등이 되고 앞서 3등, 2등인 \"poe\", \"soe\" 선수는 4등, 3등이 됩니다. 5등인 \"mine\" 선수가 2번 추월하여 4등, 3등인 \"poe\", \"soe\" 선수가 5등, 4등이 되고 경주가 끝납니다. 1등부터 배열에 담으면 [\"mumu\", \"kai\", \"mine\", \"soe\", \"poe\"]이 됩니다.</p>','javascript','1','','','[{\"players\":[\"mumu\",\"soe\",\"poe\",\"kai\",\"mine\"],\"callings\":[\"kai\",\"kai\",\"mine\",\"mine\"],\"result\":[\"mumu\",\"kai\",\"mine\",\"soe\",\"poe\"]}]\r\n',NULL,'2024-07-09 17:36:21','2024-07-09 17:36:21'),(13,'무작위로 K개의 수 뽑기','<h6>문제 설명</h6><p>랜덤으로 서로 다른 k개의 수를 저장한 배열을 만드려고 합니다. 적절한 방법이 떠오르지 않기 때문에 일정한 범위 내에서 무작위로 수를 뽑은 후, 지금까지 나온적이 없는 수이면 배열 맨 뒤에 추가하는 방식으로 만들기로 합니다.</p><p>이미 어떤 수가 무작위로 주어질지 알고 있다고 가정하고, 실제 만들어질 길이 <code>k</code>의 배열을 예상해봅시다.</p><p>정수 배열 <code>arr</code>가 주어집니다. 문제에서의 무작위의 수는 <code>arr</code>에 저장된 순서대로 주어질 예정이라고 했을 때, 완성될 배열을 return 하는 solution 함수를 완성해 주세요.</p><p>단, 완성될 배열의 길이가 <code>k</code>보다 작으면 나머지 값을 전부 -1로 채워서 return 합니다.</p><div contenteditable=\"false\"><hr></div><h5>제한사항</h5><ul><li><p>1 ≤ <code>arr</code>의 길이 ≤ 100,000</p><ul><li><p>0 ≤ <code>arr</code>의 원소 ≤ 100,000</p></li></ul></li><li><p>1 ≤ <code>k</code> ≤ 1,000</p></li></ul><div contenteditable=\"false\"><hr></div><h5>입출력 예</h5><table><thead><tr><th><p>arr</p></th><th><p>k</p></th><th><p>result</p></th></tr></thead><tbody><tr><td><p>[0, 1, 1, 2, 2, 3]</p></td><td><p>3</p></td><td><p>[0, 1, 2]</p></td></tr><tr><td><p>[0, 1, 1, 1, 1]</p></td><td><p>4</p></td><td><p>[0, 1, -1, -1]</p></td></tr></tbody></table><div contenteditable=\"false\"><hr></div><h5>입출력 예 설명</h5><p>입출력 예 #1</p><ul><li><p>앞에서부터 서로 다른 <code>k</code>개의 수를 골라내면 [0, 1, 2]가 됩니다. 따라서 [0, 1, 2]를 return 합니다.</p></li></ul><p>입출력 예 #2</p><ul><li><p>서로 다른 수의 개수가 2개 뿐이므로 서로 다른 수들을 앞에서부터 차례대로 저장한 [0, 1]에서 이후 2개의 인덱스를 -1로 채워넣은 [0, 1, -1, -1]을 return 합니다.</p></li></ul>','javascript','1','function solution(arr = [0, 1, 1, 2, 2, 3],k=3) { \\n\\n  return \'정답을 리턴해주세요\';\\n}\\n\\nconsole.log(solution());','[{\"arr\":[0,1,1,2,2,3],\"k\":3},{\"arr\":[0,1,1,1,1],\"k\":4}]','[[0, 1, 2],[0, 1, -1, -1]]','5/','2024-07-19 14:50:59','2024-07-19 17:28:04');

/*Table structure for table `exam_result` */

DROP TABLE IF EXISTS `exam_result`;

CREATE TABLE `exam_result` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `user_seq` int(12) NOT NULL,
  `exam_seq` int(12) NOT NULL,
  `result_body` text DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `exam_result` */

insert  into `exam_result`(`seq`,`user_seq`,`exam_seq`,`result_body`,`reg_date`,`edit_date`) values (1,1,1,'function solution(food){\n    temp = \"\"\n    for(i=1; i<food.length; i++){\n        let count = Math.floor(food[i]/2)\n        \n        for(j=0; j<count; j++){\n            temp += i.toString()\n        }\n    } return temp + \"0\" + [...temp].reverse().join(\"\")\n}\n\n\nconst 입력 = [1, 3, 4, 6];\nconsole.log(solution(입력));','2024-07-07 14:06:02','2024-07-07 14:06:02'),(17,5,13,'function solution(arr = [0, 1, 1, 2, 2, 3],k=3) { \n\n  let answer = [];\n  const set = new Set(arr);\n  const array = [...set];\n  for (let i = 0; i < k; i++) {\n    answer.push(array[i] !== undefined ? array[i] : -1);\n  }\n  return answer;\n}\n\nconsole.log(solution());','2024-07-19 17:28:04','2024-07-19 17:28:04'),(18,5,13,'function solution(arr1 = [0, 1, 1, 2, 2, 3],k=3) { \n\n  let answer = [];\n  const set = new Set(arr);\n  const array = [...set];\n  for (let i = 0; i < k; i++) {\n    answer.push(array[i] !== undefined ? array[i] : -1);\n  }\n  return answer;\n}\n\nconsole.log(solution());','2024-07-19 17:29:17','2024-07-19 17:29:17'),(19,5,13,'function solution(arr = [0, 1, 1, 2, 2, 3],k=3) { \n\n  let answer = [];\n  const set = new Set(arr);\n  const array = [...set];\n  for (let i = 0; i < k; i++) {\n    answer.push(array[i] !== undefined ? array[i] : -1);\n  }\n  return answer;\n}\n\nconsole.log(solution());','2024-07-19 17:37:59','2024-07-19 17:37:59'),(20,5,13,'function solution(arr = [0, 1, 1, 2, 2, 3],k=3) { \n\n  let answer = [];\n  const set = new Set(arr);\n  const array = [...set];\n  for (let i = 0; i < k; i++) {\n    answer.push(array[i] !== undefined ? array[i] : -1);\n  }\n  return answer;\n}\n\nconsole.log(solution());','2024-07-19 17:52:12','2024-07-19 17:52:12'),(21,5,1,'function solution(food=[1, 3, 4, 6]) {\n  let arr = [];\n  food.map((e, i) => {\n    if (e > 1) {\n      arr.push(i.toString().repeat(Math.floor(e / 2)));\n    }\n  });\n  return arr.join(\"\") + \"0\" + arr.reverse().join(\"\");\n}','2024-07-19 18:03:20','2024-07-19 18:03:20'),(22,5,1,'function solution(foodㅁ=[1, 3, 4, 6]) {\n  let arr = [];\n  food.map((e, i) => {\n    if (e > 1) {\n      arr.push(i.toString().repeat(Math.floor(e / 2)));\n    }\n  });\n  return arr.join(\"\") + \"0\" + arr.reverse().join(\"\");\n}','2024-07-19 18:03:26','2024-07-19 18:03:26'),(23,5,1,'function solution(foodㅁ=[1, 3, 4, 6]) {\n  let arr = [];\n  food.map((e, i) => {\n    if (e > 1) {\n      arr.push(i.toString().repeat(Math.floor(e / 2)));\n    }\n  });\n  return arr.join(\"\") + \"0\" + arr.reverse().join(\"\");\n}','2024-07-19 18:04:13','2024-07-19 18:04:13'),(24,5,1,'function solution(food=[1, 3, 4, 6]) {\n  let arr = [];\n  food.map((e, i) => {\n    if (e > 1) {\n      arr.push(i.toString().repeat(Math.floor(e / 2)));\n    }\n  });\n  return arr.join(\"\") + \"0\" + arr.reverse().join(\"\");\n}','2024-07-19 18:05:37','2024-07-19 18:05:37'),(25,5,1,'function solution(food=[1, 3, 4, 6]) {\n  let arr = [];\n  food.map((e, i) => {\n    if (e > 1) {\n      arr.push(i.toString().repeat(Math.floor(e / 2)));\n    }\n  });\n  return arr.join(\"\") + \"0\" + arr.reverse().join(\"\");\n}\n\nconsole.log(\"hello\")','2024-07-19 18:05:50','2024-07-19 18:05:50'),(26,5,13,'function solution(arr = [0, 1, 1, 2, 2, 3],k=3) { \n\n  let answer = [];\n  const set = new Set(arr);\n  const array = [...set];\n  for (let i = 0; i < k; i++) {\n    answer.push(array[i] !== undefined ? array[i] : -1);\n  }\n  return answer;\n}\n\nconsole.log(solution());','2024-07-19 18:06:23','2024-07-19 18:06:23'),(27,5,13,'function solution(arr = [0, 1, 1, 2, 2, 3],k=3) { \n\n  let answer = [];\n  const set = new Set(arr);\n  const array = [...set];\n  for (let i = 0; i < k; i++) {\n    answer.push(array[i] !== undefined ? array[i] : -1);\n  }\n  return answer;\n}\n\nconsole.log(solution());','2024-07-19 18:06:34','2024-07-19 18:06:34');

/*Table structure for table `file` */

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `origin_name` char(100) DEFAULT NULL,
  `path` char(30) DEFAULT NULL,
  `mime` char(50) DEFAULT NULL,
  `byte` char(20) DEFAULT NULL,
  `target_table` char(10) DEFAULT NULL,
  `target_seq` int(12) DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `file` */

/*Table structure for table `question` */

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `user_seq` int(12) NOT NULL,
  `exam_seq` int(12) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `view_yn` enum('Y','N') NOT NULL DEFAULT 'Y',
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `question` */

insert  into `question`(`seq`,`user_seq`,`exam_seq`,`title`,`body`,`view_yn`,`reg_date`,`edit_date`) values (1,2,1,'qwff','qfwqwf','Y','2024-07-05 13:31:38','2024-07-05 13:31:38');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `seq` int(12) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_exam_seq` int(12) NOT NULL,
  `reg_date` datetime DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*Data for the table `user` */

insert  into `user`(`seq`,`name`,`email`,`password`,`last_exam_seq`,`reg_date`,`edit_date`) values (1,'성민','dureotkd123@naver.com','slsksh33',1,NULL,'2024-07-07 14:07:34'),(2,'test','asd123@naver.com','slsksh33',1,'2024-07-05 13:15:58','2024-07-05 13:15:58'),(3,'최현명','c.hyunmyung@gmail.com','1234zxcc',1,'2024-07-05 18:04:19','2024-07-05 18:04:19'),(4,'qwfqw','asd@naver.com','asd123456789',1,'2024-07-08 17:34:10','2024-07-08 17:34:41'),(5,'test','test@naver.com','@TEST12345@',2,'2024-07-18 23:00:10','2024-07-19 18:03:20');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
