'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Functions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      headId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      // departmentId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Departments',
      //     key: 'id',
      //   },
      // },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Departments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      functionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Functions",
          key: "id",
        },
      },
      // companyId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Companies',
      //     key: 'id',
      //   },
      // },
      headId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leadId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Departments",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("Functions", {
      fields: ["headId"],
      type: "foreign key",
      name: "function_head_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Functions", {
      fields: ["companyId"],
      type: "foreign key",
      name: "function_company_fk",
      references: {
        table: "Companies",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    
    await queryInterface.addConstraint("Departments", {
      fields: ["functionId"],
      type: "foreign key",
      name: "department_function_fk",
      references: {
        table: "Functions",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });


    await queryInterface.addConstraint("Departments", {
      fields: ["headId"],
      type: "foreign key",
      name: "department_head_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    
    await queryInterface.addConstraint("Teams", {
      fields: ["leadId"],
      type: "foreign key",
      name: "team_lead_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Teams", {
      fields: ["departmentId"],
      type: "foreign key",
      name: "team_department_fk",
      references: {
        table: "Departments",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Functions');
    await queryInterface.dropTable('Departments');
    await queryInterface.dropTable("Teams");
  }
};