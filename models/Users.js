module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tel: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["USER", "ADMIN"],
        defaultValue: "USER",
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Users.associate = (models) => {
    Users.hasMany(models.Orders, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Users;
};
