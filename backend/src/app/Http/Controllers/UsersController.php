<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(
            User::all()
        );
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json($user->toArray());
    }

    public function updateMe(Request $request)
    {
        
        //入力バリデーション
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'birth_date' => 'required',
            'email' => 'required|email',
            // 'password' => 'alpha_num',
        ]);

        //バリデーションで問題がある時はエラーを返す。
        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        //バリエーションで問題がなかったらユーザを作成する。
        $user = $request->user();

        // Log::debug('before ' . $user->password);

        $user->name = $request->name;
        $user->birth_date = $request->birth_date;
        $user->email = $request->email;
        
        
        if(!empty($request->password) && $request->password !== 0){
            $user->password = Hash::make($request->password);
        }

        $user->save();

        // Log::debug('after ' . $user->password);

        //ユーザの作成が完了するとjsonを返す
        return response()->json($user, Response::HTTP_OK);

    }    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
