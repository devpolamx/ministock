<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    protected $fillable = ['name'];

    use SoftDeletes;

    /**
     * Obtiene los productos asociados a la categoría.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
