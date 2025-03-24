module.exports = ({ sequelize, DataTypes }) => {
  const Ubigeo = sequelize.define(
    'ubigeo',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      district_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      province_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      department_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'ubigeos',
    }
  );

  return Ubigeo;
};
